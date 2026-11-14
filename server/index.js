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
  { id: 'natural', name: 'Corte natural', duration: 20, price: 120, description: 'Corte de cabello natural.' },
  { id: 'desvanecido', name: 'Desvanecido', duration: 30, price: 180, description: 'Corte con desvanecido.' },
  { id: 'barba', name: 'Barba', duration: 20, price: 100, description: 'Arreglo de barba.' }
];
// Servicios de la demo anterior: solo se usan para respetar la duración de citas que ya estaban guardadas.
const legacyDurations = { clasico: 45, combo: 60, infantil: 40 };
// Perfil de administrador. Su contraseña inicial viene de BARBER_ADMIN_PASSWORD.
const adminProfile = { name: 'Junior Solis', username: 'junior' };
// Los barberos son los trabajadores que da de alta el administrador. restDay usa 0 = domingo ... 6 = sábado.
const usernamePattern = /^[a-z0-9._-]{3,30}$/;
const passwordHash = (password, salt) => scryptSync(password, salt, 64).toString('hex');
const anyBarber = 'cualquiera';
const slots = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'];
const allowedStatuses = ['Pendiente', 'Confirmada', 'Realizada', 'Cancelada'];
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

function currentServices(db) {
  const saved = new Map(db.prepare('SELECT service, price FROM service_prices').all().map(row => [row.service, row.price]));
  return services.map(service => ({ ...service, price: saved.get(service.id) ?? service.price }));
}

function barbersOf(db, branch) {
  return db.prepare("SELECT id, name, branch, rest_day AS restDay FROM users WHERE role = 'trabajador' AND active = 1 AND branch = ? ORDER BY created_at").all(branch);
}

function activeBarbers(db) {
  return db.prepare("SELECT id, name, branch, rest_day AS restDay FROM users WHERE role = 'trabajador' AND active = 1 ORDER BY branch, created_at").all();
}

function workers(db) {
  return db.prepare("SELECT id, name, username, branch, rest_day AS restDay, active FROM users WHERE role = 'trabajador' ORDER BY created_at").all()
    .map(row => ({ ...row, active: Boolean(row.active) }));
}

function startDatabase(filename, password) {
  mkdirSync(path.dirname(filename), { recursive: true });
  const db = new DatabaseSync(filename);
  db.exec(`PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, username TEXT NOT NULL UNIQUE, role TEXT NOT NULL,
      branch TEXT, rest_day INTEGER, salt TEXT NOT NULL, password_hash TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, expires_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS service_prices (service TEXT PRIMARY KEY, price INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY, branch TEXT NOT NULL, service TEXT NOT NULL,
      date TEXT NOT NULL, time TEXT NOT NULL, client_name TEXT NOT NULL,
      phone TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Pendiente',
      created_at TEXT NOT NULL
    );`);
  const columns = db.prepare('PRAGMA table_info(appointments)').all().map(column => column.name);
  if (!columns.includes('barber')) db.exec('ALTER TABLE appointments ADD COLUMN barber TEXT');
  db.exec("UPDATE appointments SET status = 'Realizada' WHERE status = 'Completada'");
  const sessionColumns = db.prepare('PRAGMA table_info(sessions)').all().map(column => column.name);
  if (!sessionColumns.includes('user_id')) db.exec('ALTER TABLE sessions ADD COLUMN user_id TEXT');
  db.exec('DELETE FROM sessions WHERE user_id IS NULL');
  if (!db.prepare("SELECT id FROM users WHERE role = 'admin' LIMIT 1").get()) {
    // Bases anteriores guardaban una sola contraseña en la tabla admin: se pasa al perfil de Junior Solis.
    const legacy = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'admin'").get()
      ? db.prepare('SELECT salt, password_hash FROM admin LIMIT 1').get() : null;
    let salt = legacy?.salt;
    let hashed = legacy?.password_hash;
    if (!legacy) {
      if (!password || password.length < 12) {
        db.close();
        throw new Error('Primera ejecución: BARBER_ADMIN_PASSWORD debe tener al menos 12 caracteres.');
      }
      salt = randomBytes(16).toString('hex');
      hashed = passwordHash(password, salt);
    }
    db.prepare("INSERT INTO users (id, name, username, role, salt, password_hash, created_at) VALUES (?, ?, ?, 'admin', ?, ?, ?)")
      .run(randomBytes(8).toString('hex'), adminProfile.name, adminProfile.username, salt, hashed, new Date().toISOString());
  }
  return db;
}

// Usuario de la sesión, o null si no hay una sesión válida.
function currentUser(db, req) {
  const match = /(?:^|;\s*)barber_session=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie || '');
  if (!match) return null;
  return db.prepare('SELECT u.id, u.name, u.role FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ? AND u.active = 1')
    .get(hash(match[1]), Date.now()) || null;
}

const durationOf = service => services.find(item => item.id === service)?.duration ?? legacyDurations[service] ?? 60;
const weekday = date => new Date(`${date}T12:00:00Z`).getUTCDay();

// Horarios libres de un barbero: respeta su día de descanso, el cierre, las dos horas de anticipación y sus otras citas.
function freeSlots(db, barber, service, date) {
  if (weekday(date) === barber.restDay) return [];
  const duration = durationOf(service);
  const closingMinute = weekday(date) === 0 ? 16 * 60 : 19 * 60;
  const bookings = db.prepare("SELECT time, service FROM appointments WHERE branch = ? AND date = ? AND status != 'Cancelada' AND (barber = ? OR barber IS NULL)").all(barber.branch, date, barber.id);
  return slots.filter(time => {
    if (minutes(time) + duration > closingMinute) return false;
    if (date === todayInJuarez() && minutes(time) < minutes(timeInJuarez()) + 120) return false;
    return !bookings.some(item => minutes(time) < minutes(item.time) + durationOf(item.service) && minutes(item.time) < minutes(time) + duration);
  });
}

// Devuelve los horarios libres o null si los datos no son válidos.
function available(db, branch, service, date, barberId = anyBarber) {
  if (!branches.some(item => item.id === branch) || !services.some(item => item.id === service) || !validBookingDate(date)) return null;
  if (barberId === anyBarber) {
    const free = new Set(barbersOf(db, branch).flatMap(barber => freeSlots(db, barber, service, date)));
    return slots.filter(time => free.has(time));
  }
  const barber = barbersOf(db, branch).find(item => item.id === barberId);
  return barber ? freeSlots(db, barber, service, date) : null;
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

      if (key === 'GET /api/config') return json(res, 200, { branches, services: currentServices(db), barbers: activeBarbers(db), slots, today: todayInJuarez(), demo: true });
      if (key === 'GET /api/availability') {
        const list = available(db, url.searchParams.get('branch'), url.searchParams.get('service'), url.searchParams.get('date'), url.searchParams.get('barber') || anyBarber);
        return list ? json(res, 200, { slots: list }) : json(res, 400, { error: 'Elige sucursal, servicio, barbero y fecha válidos.' });
      }
      if (key === 'POST /api/appointments') {
        const input = await body(req);
        const branch = safeText(input.branch);
        const service = safeText(input.service);
        const date = safeText(input.date);
        const time = safeText(input.time);
        const barberChoice = safeText(input.barber) || anyBarber;
        const clientName = safeText(input.clientName);
        const phone = safeText(input.phone);
        const barberValid = barberChoice === anyBarber || barbersOf(db, branch).some(item => item.id === barberChoice);
        if (!branches.some(item => item.id === branch) || !services.some(item => item.id === service) || !barberValid || !validBookingDate(date) || !slots.includes(time) || clientName.length < 3 || clientName.length > 80 || !/^\d{10}$/.test(phone)) {
          return json(res, 400, { error: 'Revisa los datos de la cita.' });
        }
        db.exec('BEGIN IMMEDIATE');
        try {
          const candidates = barberChoice === anyBarber ? barbersOf(db, branch) : barbersOf(db, branch).filter(item => item.id === barberChoice);
          const barber = candidates.find(item => freeSlots(db, item, service, date).includes(time));
          if (!barber) {
            db.exec('ROLLBACK');
            return json(res, 409, { error: 'Ese horario ya no está disponible.' });
          }
          const appointment = { id: randomBytes(16).toString('hex'), branch, service, barber: barber.id, barberName: barber.name, date, time, clientName, status: 'Pendiente' };
          db.prepare('INSERT INTO appointments (id, branch, service, barber, date, time, client_name, phone, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(appointment.id, branch, service, barber.id, date, time, clientName, phone, appointment.status, new Date().toISOString());
          db.exec('COMMIT');
          return json(res, 201, { appointment });
        } catch (error) { db.exec('ROLLBACK'); throw error; }
      }
      if (key === 'POST /api/admin/login') {
        const ip = req.socket.remoteAddress || 'unknown';
        const attempts = failedLogins.get(ip) || { count: 0, until: 0 };
        if (attempts.count >= 5 && attempts.until > Date.now()) return json(res, 429, { error: 'Demasiados intentos. Intenta en 15 minutos.' });
        const input = await body(req);
        const user = db.prepare('SELECT id, name, role, salt, password_hash FROM users WHERE username = ? AND active = 1').get(safeText(input.username).toLowerCase());
        const salt = user?.salt ?? '00000000000000000000000000000000';
        const candidate = scryptSync(safeText(input.password), salt, 64);
        const expected = user ? Buffer.from(user.password_hash, 'hex') : Buffer.alloc(64);
        if (!user || !timingSafeEqual(candidate, expected)) {
          failedLogins.set(ip, { count: attempts.until > Date.now() ? attempts.count + 1 : 1, until: Date.now() + 15 * 60_000 });
          return json(res, 401, { error: 'Usuario o contraseña incorrectos.' });
        }
        failedLogins.delete(ip);
        const token = randomBytes(32).toString('hex');
        const expires = Date.now() + 8 * 60 * 60_000;
        db.prepare('INSERT INTO sessions (token_hash, expires_at, user_id) VALUES (?, ?, ?)').run(hash(token), expires, user.id);
        return json(res, 200, { authenticated: true, user: { name: user.name, role: user.role } }, { 'set-cookie': `barber_session=${token}; HttpOnly; SameSite=Strict; Path=/api; Max-Age=28800${req.socket.encrypted ? '; Secure' : ''}` });
      }
      const user = currentUser(db, req);
      if (key === 'GET /api/admin/session') return json(res, 200, { authenticated: Boolean(user), user: user ? { name: user.name, role: user.role } : null });
      if (url.pathname.startsWith('/api/admin/') && !user) return json(res, 401, { error: 'Inicia sesión para entrar al panel.' });
      const adminOnly = () => json(res, 403, { error: 'Solo el administrador puede hacer esto.' });
      if (key === 'POST /api/admin/logout') {
        const token = /(?:^|;\s*)barber_session=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie || '')?.[1];
        if (token) db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(hash(token));
        return json(res, 200, { authenticated: false }, { 'set-cookie': 'barber_session=; HttpOnly; SameSite=Strict; Path=/api; Max-Age=0' });
      }
      if (key === 'GET /api/admin/appointments') {
        const rows = db.prepare('SELECT a.id, a.branch, a.service, a.barber, u.name AS barberName, a.date, a.time, a.client_name AS clientName, a.phone, a.status, a.created_at AS createdAt FROM appointments a LEFT JOIN users u ON u.id = a.barber ORDER BY a.date, a.time').all();
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
      if (key === 'GET /api/admin/workers') return user.role === 'admin' ? json(res, 200, { workers: workers(db) }) : adminOnly();
      if (key === 'POST /api/admin/workers') {
        if (user.role !== 'admin') return adminOnly();
        const input = await body(req);
        const name = safeText(input.name);
        const username = safeText(input.username).toLowerCase();
        const secret = typeof input.password === 'string' ? input.password : '';
        const branch = safeText(input.branch);
        const restDay = input.restDay;
        if (name.length < 3 || name.length > 60 || !usernamePattern.test(username) || secret.length < 10 || secret.length > 100 || !branches.some(item => item.id === branch) || !Number.isInteger(restDay) || restDay < 0 || restDay > 6) {
          return json(res, 400, { error: 'Revisa los datos del trabajador. El usuario lleva de 3 a 30 letras o números y la contraseña al menos 10 caracteres.' });
        }
        if (db.prepare('SELECT id FROM users WHERE username = ?').get(username)) return json(res, 409, { error: 'Ese usuario ya existe.' });
        const salt = randomBytes(16).toString('hex');
        const worker = { id: randomBytes(8).toString('hex'), name, username, branch, restDay, active: true };
        db.prepare("INSERT INTO users (id, name, username, role, branch, rest_day, salt, password_hash, created_at) VALUES (?, ?, ?, 'trabajador', ?, ?, ?, ?, ?)")
          .run(worker.id, name, username, branch, restDay, salt, passwordHash(secret, salt), new Date().toISOString());
        return json(res, 201, { worker });
      }
      const workerMatch = /^\/api\/admin\/workers\/([a-f0-9]{16})$/.exec(url.pathname);
      if (req.method === 'PATCH' && workerMatch) {
        if (user.role !== 'admin') return adminOnly();
        const input = await body(req);
        if (typeof input.active !== 'boolean') return json(res, 400, { error: 'Indica si el trabajador queda activo.' });
        const found = db.prepare("SELECT id FROM users WHERE id = ? AND role = 'trabajador'").get(workerMatch[1]);
        if (!found) return json(res, 404, { error: 'Trabajador no encontrado.' });
        db.prepare('UPDATE users SET active = ? WHERE id = ?').run(input.active ? 1 : 0, found.id);
        if (!input.active) db.prepare('DELETE FROM sessions WHERE user_id = ?').run(found.id);
        return json(res, 200, { updated: true });
      }
      const priceMatch = /^\/api\/admin\/services\/([a-z]+)$/.exec(url.pathname);
      if (req.method === 'PUT' && priceMatch) {
        if (user.role !== 'admin') return adminOnly();
        const input = await body(req);
        if (!services.some(item => item.id === priceMatch[1])) return json(res, 404, { error: 'Servicio no encontrado.' });
        if (!Number.isInteger(input.price) || input.price < 1 || input.price > 5000) return json(res, 400, { error: 'El precio debe ser un número entero entre 1 y 5000.' });
        db.prepare('INSERT INTO service_prices (service, price) VALUES (?, ?) ON CONFLICT(service) DO UPDATE SET price = excluded.price').run(priceMatch[1], input.price);
        return json(res, 200, { service: currentServices(db).find(item => item.id === priceMatch[1]) });
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
