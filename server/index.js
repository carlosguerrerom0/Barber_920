import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, createHash, scryptSync, timingSafeEqual } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const branches = [
  { id: 'centro', name: 'Sucursal 1', schedule: 'Lun-Sáb · 10:00-19:00 · Dom · 10:00-16:00', address: 'C. Durango 920, Morelos II, 32673 Juárez, Chih.' },
  { id: 'norte', name: 'Sucursal 2', schedule: 'Lun-Sáb · 10:00-19:00 · Dom · 10:00-16:00', address: 'Blvd. Zaragoza 104, Manuel Valdez, 32590 Juárez, Chih.' },
  { id: 'oriente', name: 'Sucursal 3', schedule: 'Lun-Sáb · 10:00-19:00 · Dom · 10:00-16:00', address: 'Cerro del Crestón #6327, Juárez, Chih. (colonia y CP pendientes)' }
];
const services = [
  { id: 'clasico', name: 'Corte clásico', duration: 45, price: 250, description: 'Corte personalizado y acabado.' },
  { id: 'barba', name: 'Arreglo de barba', duration: 30, price: 150, description: 'Perfilado y arreglo de barba.' },
  { id: 'combo', name: 'Corte y barba', duration: 60, price: 350, description: 'Servicio completo de corte y barba.' },
  { id: 'infantil', name: 'Corte infantil', duration: 40, price: 200, description: 'Corte para clientes infantiles.' }
];
const slots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const allowedStatuses = ['Pendiente', 'Confirmada', 'Completada', 'Cancelada'];
const staticPaths = new Map([
  ['/', 'index.html'], ['/index.html', 'index.html'], ['/styles.css', 'styles.css'], ['/app.js', 'app.js'],
  ['/assets/logo920.jpg', 'assets/logo920.jpg'],
  ['/assets/anton-latin-400-normal.woff2', 'assets/anton-latin-400-normal.woff2'],
  ['/assets/inter-latin-wght-normal.woff2', 'assets/inter-latin-wght-normal.woff2']
]);
const contentTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
const zone = 'America/Ciudad_Juarez';
const todayInJuarez = () => new Intl.DateTimeFormat('en-CA', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const timeInJuarez = () => new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date());
const minutes = time => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
const hash = token => createHash('sha256').update(token).digest('hex');
const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const validBookingDate = value => validDate(value) && value >= todayInJuarez();
const safeText = value => typeof value === 'string' ? value.trim() : '';

function json(res, status, data, headers = {}) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', ...headers });
  res.end(JSON.stringify(data));
}

async function body(req) {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 8192) throw new Error('El formulario supera el límite permitido.');
  }
  let parsed;
  try { parsed = JSON.parse(raw); } catch { throw new Error('JSON inválido.'); }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('JSON inválido.');
  return parsed;
}

function startDatabase(filename, password) {
  mkdirSync(path.dirname(filename), { recursive: true });
  const db = new DatabaseSync(filename);
  db.exec(`PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY, salt TEXT NOT NULL, password_hash TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, expires_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY, branch TEXT NOT NULL, service TEXT NOT NULL,
      date TEXT NOT NULL, time TEXT NOT NULL, client_name TEXT NOT NULL,
      phone TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Pendiente',
      created_at TEXT NOT NULL
    );`);
  if (!db.prepare('SELECT id FROM admin LIMIT 1').get()) {
    if (!password || password.length < 12) {
      db.close();
      throw new Error('Primera ejecución: BARBER_ADMIN_PASSWORD debe tener al menos 12 caracteres.');
    }
    const salt = randomBytes(16).toString('hex');
    db.prepare('INSERT INTO admin (salt, password_hash) VALUES (?, ?)').run(salt, scryptSync(password, salt, 64).toString('hex'));
  }
  return db;
}

function authorized(db, req) {
  const match = /(?:^|;\s*)barber_session=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie || '');
  if (!match) return false;
  const session = db.prepare('SELECT expires_at FROM sessions WHERE token_hash = ?').get(hash(match[1]));
  return Boolean(session && session.expires_at > Date.now());
}

function available(db, branch, service, date) {
  const duration = services.find(item => item.id === service)?.duration;
  if (!branches.some(item => item.id === branch) || !duration || !validBookingDate(date)) return null;
  const sunday = new Date(`${date}T12:00:00Z`).getUTCDay() === 0;
  const closingMinute = sunday ? 16 * 60 : 19 * 60;
  const bookings = db.prepare("SELECT time, service FROM appointments WHERE branch = ? AND date = ? AND status != 'Cancelada'").all(branch, date);
  return slots.filter(time => {
    if (minutes(time) + duration > closingMinute) return false;
    if (date === todayInJuarez() && minutes(time) < minutes(timeInJuarez()) + 120) return false;
    return !bookings.some(item => minutes(time) < minutes(item.time) + services.find(s => s.id === item.service).duration && minutes(item.time) < minutes(time) + duration);
  });
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  const host = req.headers.host;
  try { return new URL(origin).host === host; } catch { return false; }
}

export function createApp({ dbPath = path.join(root, 'data', 'barber.sqlite'), adminPassword = process.env.BARBER_ADMIN_PASSWORD } = {}) {
  const db = startDatabase(dbPath, adminPassword);
  const failedLogins = new Map();
  const server = createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; frame-src https://www.google.com; base-uri 'none'; frame-ancestors 'none'");
    res.setHeader('Cache-Control', 'no-store');
    try {
      const url = new URL(req.url, 'http://localhost');
      const key = `${req.method} ${url.pathname}`;
      if (url.pathname.startsWith('/api/') && !sameOrigin(req)) return json(res, 403, { error: 'Origen no permitido.' });

      if (key === 'GET /api/config') return json(res, 200, { branches, services, slots, today: todayInJuarez(), demo: true });
      if (key === 'GET /api/availability') {
        const list = available(db, url.searchParams.get('branch'), url.searchParams.get('service'), url.searchParams.get('date'));
        return list ? json(res, 200, { slots: list }) : json(res, 400, { error: 'Elige sucursal, servicio y fecha válidos.' });
      }
      if (key === 'POST /api/appointments') {
        const input = await body(req);
        const branch = safeText(input.branch);
        const service = safeText(input.service);
        const date = safeText(input.date);
        const time = safeText(input.time);
        const clientName = safeText(input.clientName);
        const phone = safeText(input.phone);
        if (!branches.some(item => item.id === branch) || !services.some(item => item.id === service) || !validBookingDate(date) || !slots.includes(time) || clientName.length < 3 || clientName.length > 80 || !/^\d{10}$/.test(phone)) {
          return json(res, 400, { error: 'Revisa los datos de la cita.' });
        }
        db.exec('BEGIN IMMEDIATE');
        try {
          if (!available(db, branch, service, date).includes(time)) {
            db.exec('ROLLBACK');
            return json(res, 409, { error: 'Ese horario ya no está disponible.' });
          }
          const appointment = { id: randomBytes(16).toString('hex'), branch, service, date, time, clientName, status: 'Pendiente' };
          db.prepare('INSERT INTO appointments (id, branch, service, date, time, client_name, phone, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').run(appointment.id, branch, service, date, time, clientName, phone, appointment.status, new Date().toISOString());
          db.exec('COMMIT');
          return json(res, 201, { appointment });
        } catch (error) { db.exec('ROLLBACK'); throw error; }
      }
      if (key === 'POST /api/admin/login') {
        const ip = req.socket.remoteAddress || 'unknown';
        const attempts = failedLogins.get(ip) || { count: 0, until: 0 };
        if (attempts.count >= 5 && attempts.until > Date.now()) return json(res, 429, { error: 'Demasiados intentos. Intenta en 15 minutos.' });
        const input = await body(req);
        const admin = db.prepare('SELECT salt, password_hash FROM admin LIMIT 1').get();
        const candidate = scryptSync(safeText(input.password), admin.salt, 64);
        const expected = Buffer.from(admin.password_hash, 'hex');
        if (!timingSafeEqual(candidate, expected)) {
          failedLogins.set(ip, { count: attempts.until > Date.now() ? attempts.count + 1 : 1, until: Date.now() + 15 * 60_000 });
          return json(res, 401, { error: 'Contraseña incorrecta.' });
        }
        failedLogins.delete(ip);
        const token = randomBytes(32).toString('hex');
        const expires = Date.now() + 8 * 60 * 60_000;
        db.prepare('INSERT INTO sessions (token_hash, expires_at) VALUES (?, ?)').run(hash(token), expires);
        return json(res, 200, { authenticated: true }, { 'set-cookie': `barber_session=${token}; HttpOnly; SameSite=Strict; Path=/api; Max-Age=28800${req.socket.encrypted ? '; Secure' : ''}` });
      }
      if (key === 'GET /api/admin/session') return json(res, 200, { authenticated: authorized(db, req) });
      if (url.pathname.startsWith('/api/admin/') && !authorized(db, req)) return json(res, 401, { error: 'Inicia sesión como administrador.' });
      if (key === 'POST /api/admin/logout') {
        const token = /(?:^|;\s*)barber_session=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie || '')?.[1];
        if (token) db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(hash(token));
        return json(res, 200, { authenticated: false }, { 'set-cookie': 'barber_session=; HttpOnly; SameSite=Strict; Path=/api; Max-Age=0' });
      }
      if (key === 'GET /api/admin/appointments') {
        const rows = db.prepare('SELECT id, branch, service, date, time, client_name AS clientName, phone, status, created_at AS createdAt FROM appointments ORDER BY date, time').all();
        return json(res, 200, { appointments: rows });
      }
      const statusMatch = /^\/api\/admin\/appointments\/([a-f0-9]{32})$/.exec(url.pathname);
      if (req.method === 'PATCH' && statusMatch) {
        const input = await body(req);
        if (!allowedStatuses.includes(input.status)) return json(res, 400, { error: 'Estado inválido.' });
        const existing = db.prepare('SELECT branch, service, date, time, status FROM appointments WHERE id = ?').get(statusMatch[1]);
        if (!existing) return json(res, 404, { error: 'Cita no encontrada.' });
        if (existing.status === 'Cancelada' && input.status !== 'Cancelada') {
          return json(res, 409, { error: 'Una cita cancelada no se puede reactivar. Registra una cita nueva.' });
        }
        db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(input.status, statusMatch[1]);
        return json(res, 200, { updated: true });
      }
      if (url.pathname.startsWith('/api/')) return json(res, 404, { error: 'Ruta no encontrada.' });
      const file = staticPaths.get(url.pathname);
      if (req.method !== 'GET' || !file) return json(res, 404, { error: 'Página no encontrada.' });
      const content = await readFile(path.join(root, 'web', file));
      res.writeHead(200, { 'content-type': contentTypes[path.extname(file)] });
      res.end(content);
    } catch (error) {
      const isInputError = error instanceof SyntaxError || /formulario|JSON inválido/.test(error.message);
      json(res, isInputError ? 400 : 500, { error: isInputError ? error.message : 'Error interno del servidor.' });
      if (!isInputError) console.error(error);
    }
  });
  server.on('close', () => db.close());
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = createApp();
  const port = Number(process.env.PORT || 3000);
  server.listen(port, process.env.HOST || '127.0.0.1', () => console.log(`Barber 920: http://${process.env.HOST || '127.0.0.1'}:${port}`));
}
