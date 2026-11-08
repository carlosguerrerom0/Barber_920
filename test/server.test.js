import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
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
  for (const branch of ['centro', 'norte', 'oriente']) {
    assert.equal(config.payload.barbers.filter(item => item.branch === branch).length, 2);
  }
  for (const [asset, type] of [['/assets/logo920.jpg', 'image/jpeg'], ['/assets/anton-latin-400-normal.woff2', 'font/woff2'], ['/assets/inter-latin-wght-normal.woff2', 'font/woff2']]) {
    const response = await fetch(app.base + asset);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), type);
  }
  assert.equal((await fetch(`${app.base}/assets/OFL-Anton.txt`)).status, 404);
  assert.match((await fetch(app.base + '/')).headers.get('content-security-policy'), /frame-src https:\/\/www\.google\.com;/);
}));

test('horarios: cierre, domingo y día de descanso de cada barbero', () => withApp(async ({ app }) => {
  const weekdaySlots = await slotsFor(app.base, { barber: 'suc1-a' });
  assert.equal(weekdaySlots.includes('10:00'), true);
  assert.equal(weekdaySlots.includes('18:30'), true);
  assert.equal((await slotsFor(app.base, { service: 'desvanecido', barber: 'suc1-a' })).includes('18:30'), true);
  const sundaySlots = await slotsFor(app.base, { service: 'desvanecido', date: sunday });
  assert.equal(sundaySlots.includes('15:30'), true);
  assert.equal(sundaySlots.includes('16:00'), false);
  // Barbero A descansa el lunes; Barbero B sí trabaja.
  assert.deepEqual(await slotsFor(app.base, { date: monday, barber: 'suc1-a' }), []);
  assert.equal((await slotsFor(app.base, { date: monday, barber: 'suc1-b' })).length > 0, true);
  assert.equal((await slotsFor(app.base, { date: monday })).length > 0, true);
  const invalid = await request(app.base, `/api/availability?branch=centro&service=natural&date=${tuesday}&barber=suc2-a`);
  assert.equal(invalid.status, 400);
}));

test('reservas por barbero, conflictos, sesión de administración y persistencia', () => withApp(async holder => {
  let { app } = holder;
  const booking = { branch: 'centro', service: 'natural', barber: 'suc1-a', date: tuesday, time: '11:00', clientName: 'Cliente Demo', phone: '0000000000' };

  assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, date: sunday, time: '16:00' })).status, 409);
  assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, date: '2020-01-01' })).status, 400);
  assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, barber: 'suc2-a' })).status, 400);
  assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, barber: 'no-existe' })).status, 400);
  assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, date: monday })).status, 409);

  const created = await request(app.base, '/api/appointments', 'POST', booking);
  assert.equal(created.status, 201);
  assert.equal(created.payload.appointment.barber, 'suc1-a');
  assert.equal(created.payload.appointment.barberName, 'Barbero A');
  assert.equal((await request(app.base, '/api/appointments', 'POST', booking)).status, 409);
  assert.equal((await slotsFor(app.base, { barber: 'suc1-a' })).includes('11:00'), false);
  // Mismo horario con otro barbero: sí se puede.
  const any = await request(app.base, '/api/appointments', 'POST', { ...booking, barber: 'cualquiera' });
  assert.equal(any.status, 201);
  assert.equal(any.payload.appointment.barber, 'suc1-b');
  assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, barber: 'cualquiera' })).status, 409);
  assert.equal((await slotsFor(app.base)).includes('11:00'), false);
  // El corte termina a las 11:20, así que a las 11:30 el barbero vuelve a estar libre.
  assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, time: '11:30' })).status, 201);

  assert.equal((await request(app.base, '/api/admin/appointments')).status, 401);
  assert.equal((await request(app.base, '/api/admin/login', 'POST', { password: 'wrong-password' })).status, 401);
  const login = await request(app.base, '/api/admin/login', 'POST', { password });
  assert.equal(login.status, 200);
  assert.match(login.cookie, /^barber_session=/);
  let listing = await request(app.base, '/api/admin/appointments', 'GET', undefined, login.cookie);
  assert.equal(listing.payload.appointments.length, 3);
  assert.equal(listing.payload.appointments[0].phone, booking.phone);
  assert.deepEqual(listing.payload.appointments.map(item => item.barber).sort(), ['suc1-a', 'suc1-a', 'suc1-b']);

  const route = `/api/admin/appointments/${created.payload.appointment.id}`;
  assert.equal((await request(app.base, route, 'PATCH', { status: 'Cancelada' }, login.cookie)).status, 200);
  assert.equal((await request(app.base, route, 'PATCH', { status: 'Confirmada' }, login.cookie)).status, 409);
  assert.equal((await request(app.base, '/api/appointments', 'POST', booking)).status, 201);
  assert.equal((await request(app.base, '/api/admin/logout', 'POST', undefined, login.cookie)).status, 200);
  assert.equal((await request(app.base, '/api/admin/appointments', 'GET', undefined, login.cookie)).status, 401);

  await new Promise(resolve => app.server.close(resolve));
  app = holder.app = await start(holder.dbPath);
  const nextLogin = await request(app.base, '/api/admin/login', 'POST', { password });
  listing = await request(app.base, '/api/admin/appointments', 'GET', undefined, nextLogin.cookie);
  assert.equal(listing.payload.appointments.length, 4);
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
    old.close();
    app = await start(dbPath);
    const free = await slotsFor(app.base);
    assert.equal(free.includes('11:30'), true);
    assert.equal(free.includes('12:00'), false);
    assert.equal(free.includes('12:30'), false);
    assert.equal(free.includes('13:00'), true);
    const login = await request(app.base, '/api/admin/login', 'POST', { password });
    const listing = await request(app.base, '/api/admin/appointments', 'GET', undefined, login.cookie);
    assert.equal(listing.payload.appointments[0].barber, null);
  } finally {
    if (app?.server.listening) await new Promise(resolve => app.server.close(resolve));
    await rm(dir, { recursive: true, force: true });
  }
});
