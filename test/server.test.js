import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createApp } from '../server/index.js';

const password = 'example-password-12345';
const futureWeekday = () => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + 8);
  while (date.getUTCDay() === 0) date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
};

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

test('reservas, conflictos, sesión de administración y persistencia', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'barber920-'));
  const dbPath = path.join(dir, 'demo.sqlite');
  let app;
  try {
    app = await start(dbPath);
    const date = futureWeekday();
    const booking = { branch: 'centro', service: 'combo', date, time: '11:00', clientName: 'Cliente Demo', phone: '0000000000' };
    const config = await request(app.base, '/api/config');
    assert.equal(config.status, 200);
    assert.equal(config.payload.demo, true);
    assert.equal((await request(app.base, `/api/availability?branch=centro&service=combo&date=${date}`)).payload.slots.includes('11:00'), true);
    assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, date: '2020-01-01' })).status, 400);
    const created = await request(app.base, '/api/appointments', 'POST', booking);
    assert.equal(created.status, 201);
    assert.equal((await request(app.base, '/api/appointments', 'POST', booking)).status, 409);
    assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, service: 'barba' })).status, 409);
    assert.equal((await request(app.base, '/api/appointments', 'POST', { ...booking, time: '10:00' })).status, 201);
    assert.equal((await request(app.base, '/api/admin/appointments')).status, 401);
    assert.equal((await request(app.base, '/api/admin/login', 'POST', { password: 'wrong-password' })).status, 401);
    const login = await request(app.base, '/api/admin/login', 'POST', { password });
    assert.equal(login.status, 200);
    assert.match(login.cookie, /^barber_session=/);
    let listing = await request(app.base, '/api/admin/appointments', 'GET', undefined, login.cookie);
    assert.equal(listing.payload.appointments.length, 2);
    assert.equal(listing.payload.appointments[0].phone, booking.phone);
    const route = `/api/admin/appointments/${created.payload.appointment.id}`;
    assert.equal((await request(app.base, route, 'PATCH', { status: 'Cancelada' }, login.cookie)).status, 200);
    assert.equal((await request(app.base, route, 'PATCH', { status: 'Confirmada' }, login.cookie)).status, 409);
    assert.equal((await request(app.base, '/api/appointments', 'POST', booking)).status, 201);
    assert.equal((await request(app.base, '/api/admin/logout', 'POST', undefined, login.cookie)).status, 200);
    assert.equal((await request(app.base, '/api/admin/appointments', 'GET', undefined, login.cookie)).status, 401);
    await new Promise(resolve => app.server.close(resolve));
    app = await start(dbPath);
    const nextLogin = await request(app.base, '/api/admin/login', 'POST', { password });
    listing = await request(app.base, '/api/admin/appointments', 'GET', undefined, nextLogin.cookie);
    assert.equal(listing.payload.appointments.length, 3);
  } finally {
    if (app?.server.listening) await new Promise(resolve => app.server.close(resolve));
    await rm(dir, { recursive: true, force: true });
  }
});
