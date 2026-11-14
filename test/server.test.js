import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { scryptSync } from 'node:crypto';
import { createApp } from '../server/index.js';

const password = 'example-password-12345';

// Fecha futura (al menos 8 días después de hoy) que cae en el día de la semana indicado. 0 = domingo.
const nextDay = weekday => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + 8);
  while (date.getUTCDay() !== weekday) date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
};
const tuesday = nextDay(2);
const monday = nextDay(1);
const sunday = nextDay(0);

async function start(dbPath) {
  const server = createApp({ dbPath, adminPassword: password });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return { server, base: `http://127.0.0.1:${server.address().port}` };
}

async function request(base, route, method = 'GET', data, cookie) {
  const response = await fetch(base + route, {
    method,
    headers: { ...(data ? { 'content-type': 'application/json' } : {}), ...(cookie ? { cookie } : {}) },
    body: data ? JSON.stringify(data) : undefined
  });
  return { status: response.status, payload: await response.json(), cookie: response.headers.get('set-cookie')?.split(';')[0] };
}

const slotsFor = async (base, { branch = 'centro', service = 'natural', date = tuesday, barber } = {}) => {
  const params = new URLSearchParams({ branch, service, date, ...(barber ? { barber } : {}) });
  return (await request(base, `/api/availability?${params}`)).payload.slots;
};

const admin = { username: 'junior', password };
const login = async (base, account = admin) => (await request(base, '/api/admin/login', 'POST', account)).cookie;

// Da de alta dos barberos por sucursal con el perfil de Junior Solis. Devuelve sus ids.
async function createTeam(base, account = admin) {
  const cookie = await login(base, account);
  const team = {};
  for (const [key, name, branch, restDay] of [['a', 'Barbero Uno', 'centro', 1], ['b', 'Barbero Dos', 'centro', 3], ['c', 'Barbero Tres', 'norte', 2]]) {
    const response = await request(base, '/api/admin/workers', 'POST', { name, username: `barbero.${key}`, password: 'clave-trabajador-1', branch, restDay }, cookie);
    assert.equal(response.status, 201);
    team[key] = response.payload.worker.id;
  }
  return team;
}

async function withApp(run) {
  const dir = await mkdtemp(path.join(tmpdir(), 'barber920-'));
  const dbPath = path.join(dir, 'demo.sqlite');
  const holder = { app: await start(dbPath), dbPath };
  try {
    await run(holder);
  } finally {
    if (holder.app?.server.listening) await new Promise(resolve => holder.app.server.close(resolve));
    await rm(dir, { recursive: true, force: true });
  }
}

test('configuración: sucursales, servicios de la entrevista y barberos', () => withApp(async ({ app }) => {
  const config = await request(app.base, '/api/config');
  assert.equal(config.status, 200);
  assert.equal(config.payload.demo, true);
  assert.equal(config.payload.branches[0].address, 'C. Durango 920, Morelos II, 32673 Juárez, Chih.');
  assert.equal(config.payload.branches[1].address, 'Blvd. Zaragoza 104, Manuel Valdez, 32590 Juárez, Chih.');
  assert.match(config.payload.branches[2].address, /Cerro del Crestón #6327/);
  assert.deepEqual(config.payload.services.map(item => [item.id, item.price, item.duration]), [['natural', 120, 20], ['desvanecido', 180, 30], ['barba', 100, 20]]);
  // Sin registros de ejemplo: los barberos los da de alta el administrador.
  assert.deepEqual(config.payload.barbers, []);
  const session = await request(app.base, '/api/admin/login', 'POST', admin);
  assert.equal(session.status, 200);
  assert.deepEqual(session.payload.user, { name: 'Junior Solis', role: 'admin' });
  assert.equal((await request(app.base, '/api/admin/login', 'POST', { username: 'junior', password: 'otra-clave-12345' })).status, 401);
  for (const [asset, type] of [['/assets/logo920.jpg', 'image/jpeg'], ['/assets/anton-latin-400-normal.woff2', 'font/woff2'], ['/assets/inter-latin-wght-normal.woff2', 'font/woff2']]) {
    const response = await fetch(app.base + asset);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), type);
  }
  assert.equal((await fetch(`${app.base}/assets/OFL-Anton.txt`)).status, 404);
  assert.match((await fetch(app.base + '/')).headers.get('content-security-policy'), /frame-src https:\/\/www\.google\.com;/);
}));

test('horarios: cierre, domingo y día de descanso de cada barbero', () => withApp(async ({ app }) => {
  assert.deepEqual(await slotsFor(app.base), []);
  const team = await createTeam(app.base);
  const weekdaySlots = await slotsFor(app.base, { barber: team.a });
  assert.equal(weekdaySlots.includes('10:00'), true);
  assert.equal(weekdaySlots.includes('18:30'), true);
  assert.equal((await slotsFor(app.base, { service: 'desvanecido', barber: team.a })).includes('18:30'), true);
  const sundaySlots = await slotsFor(app.base, { service: 'desvanecido', date: sunday });
  assert.equal(sundaySlots.includes('15:30'), true);
  assert.equal(sundaySlots.includes('16:00'), false);
  // Barbero Uno descansa el lunes. Barbero Dos sí trabaja.
  assert.deepEqual(await slotsFor(app.base, { date: monday, barber: team.a }), []);
  assert.equal((await slotsFor(app.base, { date: monday, barber: team.b })).length > 0, true);
  assert.equal((await slotsFor(app.base, { date: monday })).length > 0, true);
  const invalid = await request(app.base, `/api/availability?branch=centro&service=natural&date=${tuesday}&barber=${team.c}`);
  assert.equal(invalid.status, 400);
}));

test('reservas por barbero, conflictos, sesión de administración y persistencia', () => withApp(async holder => {
  let { app } = holder;
  const team = await createTeam(app.base);
  const booking = { branch: 'centro', service: 'natural', barber: team.a, date: tuesday, time: '11:00', clientName: 'Cliente Demo', phone: '0000000000' };

  assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, date: sunday, time: '16:00' })).status, 409);
  assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, date: '2020-01-01' })).status, 400);
  assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, barber: team.c })).status, 400);
  assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, barber: 'no-existe' })).status, 400);
  assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, date: monday })).status, 409);

  const created = await request(app.base, '/api/appointments', 'POST', booking);
  assert.equal(created.status, 201);
  assert.equal(created.payload.appointment.barber, team.a);
  assert.equal(created.payload.appointment.barberName, 'Barbero Uno');
  assert.equal((await request(app.base, '/api/appointments', 'POST', booking)).status, 409);
  assert.equal((await slotsFor(app.base, { barber: team.a })).includes('11:00'), false);
  // Mismo horario con otro barbero: sí se puede.
  const any = await request(app.base, '/api/appointments', 'POST', { ...booking, barber: 'cualquiera' });
  assert.equal(any.status, 201);
  assert.equal(any.payload.appointment.barber, team.b);
  assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, barber: 'cualquiera' })).status, 409);
  assert.equal((await slotsFor(app.base)).includes('11:00'), false);
  // El corte termina a las 11:20, así que a las 11:30 el barbero vuelve a estar libre.
  assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, time: '11:30' })).status, 201);

  assert.equal((await request(app.base, '/api/admin/appointments')).status, 401);
  assert.equal((await request(app.base, '/api/admin/login', 'POST', { username: 'junior', password: 'wrong-password' })).status, 401);
  const login = await request(app.base, '/api/admin/login', 'POST', admin);
  assert.equal(login.status, 200);
  assert.match(login.cookie, /^barber_session=/);
  let listing = await request(app.base, '/api/admin/appointments', 'GET', undefined, login.cookie);
  assert.equal(listing.payload.appointments.length, 3);
  assert.equal(listing.payload.appointments[0].phone, booking.phone);
  assert.deepEqual(listing.payload.appointments.map(item => item.barber).sort(), [team.a, team.a, team.b].sort());
  assert.equal(listing.payload.appointments.find(item => item.barber === team.b).barberName, 'Barbero Dos');

  const route = `/api/admin/appointments/${created.payload.appointment.id}`;
  assert.equal((await request(app.base, route, 'PATCH', { status: 'Cancelada' }, login.cookie)).status, 200);
  assert.equal((await request(app.base, route, 'PATCH', { status: 'Confirmada' }, login.cookie)).status, 409);
  const anyRoute = `/api/admin/appointments/${any.payload.appointment.id}`;
  assert.equal((await request(app.base, anyRoute, 'PATCH', { status: 'Completada' }, login.cookie)).status, 400);
  assert.equal((await request(app.base, anyRoute, 'PATCH', { status: 'Realizada' }, login.cookie)).status, 200);
  assert.equal((await request(app.base, '/api/appointments', 'POST', booking)).status, 201);
  assert.equal((await request(app.base, '/api/admin/services/barba', 'PUT', { price: 0 }, login.cookie)).status, 400);
  assert.equal((await request(app.base, '/api/admin/services/peinado', 'PUT', { price: 90 }, login.cookie)).status, 404);
  const newPrice = await request(app.base, '/api/admin/services/barba', 'PUT', { price: 110 }, login.cookie);
  assert.equal(newPrice.status, 200);
  assert.equal(newPrice.payload.service.price, 110);
  assert.equal((await request(app.base, '/api/config')).payload.services.find(item => item.id === 'barba').price, 110);
  assert.equal((await request(app.base, '/api/admin/logout', 'POST', undefined, login.cookie)).status, 200);
  assert.equal((await request(app.base, '/api/admin/services/barba', 'PUT', { price: 120 })).status, 401);
  assert.equal((await request(app.base, '/api/admin/appointments', 'GET', undefined, login.cookie)).status, 401);

  await new Promise(resolve => app.server.close(resolve));
  app = holder.app = await start(holder.dbPath);
  const nextLogin = await request(app.base, '/api/admin/login', 'POST', admin);
  listing = await request(app.base, '/api/admin/appointments', 'GET', undefined, nextLogin.cookie);
  assert.equal(listing.payload.appointments.length, 4);
  assert.equal((await request(app.base, '/api/config')).payload.services.find(item => item.id === 'barba').price, 110);
}));

test('citas guardadas antes de la Fase 3 siguen bloqueando su horario', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'barber920-'));
  const dbPath = path.join(dir, 'old.sqlite');
  let app;
  try {
    // Base con la estructura de la Fase 2 (sin columna barber) y una cita del servicio "combo" de 60 minutos.
    const old = new DatabaseSync(dbPath);
    old.exec(`CREATE TABLE appointments (
      id TEXT PRIMARY KEY, branch TEXT NOT NULL, service TEXT NOT NULL,
      date TEXT NOT NULL, time TEXT NOT NULL, client_name TEXT NOT NULL,
      phone TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Pendiente',
      created_at TEXT NOT NULL)`);
    old.prepare('INSERT INTO appointments VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').run('a'.repeat(32), 'centro', 'combo', tuesday, '12:00', 'Cita vieja', '0000000000', 'Pendiente', new Date().toISOString());
    old.prepare('INSERT INTO appointments VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').run('b'.repeat(32), 'centro', 'clasico', tuesday, '16:00', 'Cita vieja atendida', '0000000000', 'Completada', new Date().toISOString());
    // La Fase 2 guardaba una sola contraseña en la tabla admin. Pasa al perfil de Junior Solis.
    old.exec('CREATE TABLE admin (id INTEGER PRIMARY KEY, salt TEXT NOT NULL, password_hash TEXT NOT NULL); CREATE TABLE sessions (token_hash TEXT PRIMARY KEY, expires_at INTEGER NOT NULL);');
    old.prepare('INSERT INTO admin (salt, password_hash) VALUES (?, ?)').run('ab'.repeat(16), scryptSync('clave-anterior-1234', 'ab'.repeat(16), 64).toString('hex'));
    old.close();
    app = await start(dbPath);
    assert.equal((await request(app.base, '/api/admin/login', 'POST', { username: 'junior', password: 'clave-anterior-1234' })).status, 200);
    await createTeam(app.base, { username: 'junior', password: 'clave-anterior-1234' });
    const free = await slotsFor(app.base, { barber: (await request(app.base, '/api/config')).payload.barbers[0].id });
    assert.equal(free.includes('11:30'), true);
    assert.equal(free.includes('12:00'), false);
    assert.equal(free.includes('12:30'), false);
    assert.equal(free.includes('13:00'), true);
    const session = await request(app.base, '/api/admin/login', 'POST', { username: 'junior', password: 'clave-anterior-1234' });
    const listing = await request(app.base, '/api/admin/appointments', 'GET', undefined, session.cookie);
    assert.equal(listing.payload.appointments[0].barber, null);
    const statuses = listing.payload.appointments.map(item => item.status);
    assert.equal(statuses.includes('Realizada'), true);
    assert.equal(statuses.includes('Completada'), false);
  } finally {
    if (app?.server.listening) await new Promise(resolve => app.server.close(resolve));
    await rm(dir, { recursive: true, force: true });
  }
});

test('trabajadores: el administrador los da de alta y de baja', () => withApp(async ({ app }) => {
  const team = await createTeam(app.base);
  const cookie = await login(app.base);
  const listed = await request(app.base, '/api/admin/workers', 'GET', undefined, cookie);
  assert.deepEqual(listed.payload.workers.map(item => item.name), ['Barbero Uno', 'Barbero Dos', 'Barbero Tres']);
  assert.equal((await request(app.base, '/api/admin/workers', 'POST', { name: 'Repetido', username: 'barbero.a', password: 'clave-trabajador-1', branch: 'centro', restDay: 2 }, cookie)).status, 409);
  assert.equal((await request(app.base, '/api/admin/workers', 'POST', { name: 'Sin clave', username: 'sin.clave', password: 'corta', branch: 'centro', restDay: 2 }, cookie)).status, 400);
  assert.equal((await request(app.base, '/api/admin/workers', 'POST', { name: 'Sin sucursal', username: 'sin.sucursal', password: 'clave-trabajador-1', branch: 'otra', restDay: 2 }, cookie)).status, 400);

  // Un trabajador entra al panel y ve las citas, pero no administra trabajadores ni precios.
  const worker = await request(app.base, '/api/admin/login', 'POST', { username: 'barbero.c', password: 'clave-trabajador-1' });
  assert.equal(worker.status, 200);
  assert.deepEqual(worker.payload.user, { name: 'Barbero Tres', role: 'trabajador' });
  assert.equal((await request(app.base, '/api/admin/appointments', 'GET', undefined, worker.cookie)).status, 200);
  assert.equal((await request(app.base, '/api/admin/workers', 'GET', undefined, worker.cookie)).status, 403);
  assert.equal((await request(app.base, '/api/admin/services/barba', 'PUT', { price: 90 }, worker.cookie)).status, 403);

  // Al darlo de baja ya no aparece para reservar ni puede entrar.
  assert.equal((await request(app.base, `/api/admin/workers/${team.c}`, 'PATCH', { active: false }, cookie)).status, 200);
  assert.equal((await request(app.base, '/api/config')).payload.barbers.some(item => item.id === team.c), false);
  assert.equal((await request(app.base, '/api/admin/appointments', 'GET', undefined, worker.cookie)).status, 401);
  assert.equal((await request(app.base, '/api/admin/login', 'POST', { username: 'barbero.c', password: 'clave-trabajador-1' })).status, 401);
  assert.equal((await request(app.base, `/api/admin/workers/${team.c}`, 'PATCH', { active: true }, cookie)).status, 200);
  assert.equal((await request(app.base, '/api/config')).payload.barbers.some(item => item.id === team.c), true);
}));
