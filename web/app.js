let branches = [];
let services = [];
let barbers = [];
let appointments = [];
let today = '';
let availabilityRequest = 0;

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const money = value => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(value);
const branchName = id => branches.find(item => item.id === id)?.name || id;
const serviceName = id => services.find(item => item.id === id)?.name || id;
const barberName = id => barbers.find(item => item.id === id)?.name || 'Sin asignar';
const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const mapsQuery = branch => encodeURIComponent(branch.address.replace(/\s*\(.*?\)/g, ''));
const mapEmbedUrl = branch => `https://www.google.com/maps?output=embed&hl=es&q=${mapsQuery(branch)}`;
const directionsUrl = branch => `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery(branch)}`;

async function api(path, options) {
  const response = await fetch(path, {
    ...options,
    headers: options?.body ? { 'content-type': 'application/json' } : {}
  });
  const payload = await response.json();
  if (!response.ok) throw Object.assign(new Error(payload.error || 'Error de conexión.'), { status: response.status });
  return payload;
}

function showView(id) {
  $$('.view').forEach(view => {
    const active = view.id === id;
    view.hidden = !active;
    view.classList.toggle('active-view', active);
  });
  $$('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.viewLink === id));
  $('#mainNav').classList.remove('open');
  $('#menuButton').setAttribute('aria-expanded', 'false');
  if (id === 'administracion') refreshAdmin();
  if (id === 'sucursales') loadMaps();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadMaps() {
  for (const map of $$('.branch-map:not([src])')) map.src = map.dataset.src;
}

function directionsLink(link, branch) {
  link.href = directionsUrl(branch);
  link.setAttribute('aria-label', `Cómo llegar a ${branch.name} en Google Maps (se abre en otra pestaña)`);
  return link;
}

function option(value, label) {
  const element = document.createElement('option');
  element.value = value;
  element.textContent = label;
  return element;
}

function renderServices() {
  const chosen = $('#service').value;
  $('#serviceCards').replaceChildren();
  $('#service').replaceChildren(option('', 'Selecciona un servicio'));
  for (const service of services) {
    const card = document.createElement('article');
    card.className = 'service-card';
    const title = document.createElement('h3');
    title.textContent = service.name;
    const price = document.createElement('p');
    price.className = 'service-price';
    price.textContent = money(service.price);
    const description = document.createElement('p');
    description.textContent = service.description;
    const meta = document.createElement('p');
    meta.className = 'service-meta';
    meta.textContent = `${service.duration} min aprox.`;
    card.append(title, price, description, meta);
    $('#serviceCards').append(card);
    $('#service').append(option(service.id, `${service.name} · ${service.duration} min · ${money(service.price)}`));
  }
  $('#service').value = chosen;
  renderPriceForm();
}

function renderPriceForm() {
  const form = $('#priceForm');
  form.replaceChildren();
  for (const service of services) {
    const field = document.createElement('div');
    const label = document.createElement('label');
    label.htmlFor = `price-${service.id}`;
    label.textContent = `${service.name} (MXN)`;
    const input = document.createElement('input');
    input.id = `price-${service.id}`;
    input.type = 'number';
    input.min = '1';
    input.max = '5000';
    input.step = '1';
    input.required = true;
    input.value = String(service.price);
    input.dataset.service = service.id;
    field.append(label, input);
    form.append(field);
  }
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'button primary';
  button.textContent = 'Guardar precios';
  form.append(button);
}

async function savePrices(event) {
  event.preventDefault();
  const message = $('#priceMessage');
  message.textContent = '';
  try {
    for (const input of $$('#priceForm input')) {
      const service = services.find(item => item.id === input.dataset.service);
      const price = Number(input.value);
      if (service && price !== service.price) {
        const saved = await api(`/api/admin/services/${service.id}`, { method: 'PUT', body: JSON.stringify({ price }) });
        service.price = saved.service.price;
      }
    }
    renderServices();
    updateSummary();
    message.textContent = 'Precios guardados.';
  } catch (error) {
    message.textContent = error.message;
  }
}

function populateContent(config) {
  branches = config.branches;
  services = config.services;
  barbers = config.barbers;
  today = config.today;
  $('#date').min = config.today;
  renderServices();
  for (const [index, branch] of branches.entries()) {
    const card = document.createElement('article');
    card.className = 'branch-card';
    const number = document.createElement('span');
    number.className = 'branch-number';
    number.textContent = `0${index + 1}`;
    const title = document.createElement('h2');
    title.textContent = branch.name;
    const list = document.createElement('ul');
    const team = barbers.filter(item => item.branch === branch.id).map(item => item.name).join(' y ');
    for (const value of [branch.schedule, branch.address, `Barberos de prueba: ${team}`]) {
      const item = document.createElement('li');
      item.textContent = value;
      list.append(item);
    }
    const button = document.createElement('button');
    button.className = 'button secondary choose-branch';
    button.dataset.branch = branch.id;
    button.textContent = 'Elegir esta sucursal';
    button.setAttribute('aria-label', `Elegir ${branch.name}`);
    const directions = document.createElement('a');
    directions.className = 'button secondary';
    directions.target = '_blank';
    directions.rel = 'noopener';
    directions.textContent = 'Cómo llegar';
    const actions = document.createElement('div');
    actions.className = 'branch-actions';
    actions.append(button, directionsLink(directions, branch));
    const map = document.createElement('iframe');
    map.className = 'branch-map';
    map.title = `Mapa de ${branch.name} en Google Maps`;
    map.dataset.src = mapEmbedUrl(branch);
    card.append(number, map, title, list, actions);
    $('#branchCards').append(card);
    $('#branch').append(option(branch.id, branch.name));
    $('#filterBranch').append(option(branch.id, branch.name));
  }
  for (const barber of barbers) $('#filterBarber').append(option(barber.id, `${barber.name} · ${branchName(barber.branch)}`));
}

function fillBarbers() {
  const select = $('#barber');
  select.replaceChildren(option('cualquiera', 'Sin preferencia'));
  for (const barber of barbers.filter(item => item.branch === $('#branch').value)) {
    select.append(option(barber.id, `${barber.name} · descansa los ${dayNames[barber.restDay]}`));
  }
}

function updateSummary() {
  const branch = branches.find(item => item.id === $('#branch').value);
  const service = services.find(item => item.id === $('#service').value);
  $('#summaryBranch').textContent = branch?.name || 'Sin seleccionar';
  $('#summaryBarber').textContent = $('#barber').value === 'cualquiera' ? 'Sin preferencia' : barberName($('#barber').value);
  $('#summaryService').textContent = service?.name || 'Selecciona un servicio';
  $('#summaryDuration').textContent = service ? `${service.duration} minutos` : '-';
  $('#summaryPrice').textContent = service ? money(service.price) : '-';
}

async function refreshAvailability() {
  const request = ++availabilityRequest;
  const select = $('#time');
  select.replaceChildren(option('', 'Selecciona'));
  const branch = $('#branch').value;
  const service = $('#service').value;
  const date = $('#date').value;
  const barber = $('#barber').value || 'cualquiera';
  if (!branch || !service || !date) return;
  select.options[0].textContent = 'Consultando...';
  try {
    const params = new URLSearchParams({ branch, service, date, barber });
    const result = await api(`/api/availability?${params}`);
    if (request !== availabilityRequest) return;
    select.options[0].textContent = result.slots.length ? 'Selecciona' : 'Sin horarios disponibles';
    for (const time of result.slots) select.append(option(time, time));
    $('#formMessage').textContent = '';
  } catch (error) {
    if (request !== availabilityRequest) return;
    select.options[0].textContent = 'Selecciona';
    $('#formMessage').textContent = error.message;
  }
}

async function submitBooking(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const submit = form.querySelector('[type=submit]');
  const data = Object.fromEntries(new FormData(form));
  submit.disabled = true;
  $('#formMessage').textContent = '';
  try {
    const { appointment } = await api('/api/appointments', { method: 'POST', body: JSON.stringify(data) });
    $('#confirmationText').textContent = `${data.clientName}: ${serviceName(data.service)} con ${appointment.barberName} en ${branchName(data.branch)}, ${data.date} a las ${data.time}.`;
    directionsLink($('#confirmationDirections'), branches.find(item => item.id === data.branch));
    form.reset();
    fillBarbers();
    updateSummary();
    refreshAvailability();
    showView('confirmacion');
  } catch (error) {
    $('#formMessage').textContent = error.message;
    if (error.status === 409) refreshAvailability();
  } finally {
    submit.disabled = false;
  }
}

function weekRange(day) {
  const date = new Date(`${day}T12:00:00`);
  const start = new Date(date);
  start.setDate(date.getDate() - (date.getDay() + 6) % 7);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const iso = value => `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
  return [iso(start), iso(end)];
}

function renderPeriodSummary(all) {
  const active = all.filter(item => item.status !== 'Cancelada');
  const [weekStart, weekEnd] = weekRange(today);
  $('#summaryToday').textContent = active.filter(item => item.date === today).length;
  $('#summaryWeek').textContent = active.filter(item => item.date >= weekStart && item.date <= weekEnd).length;
  $('#summaryMonth').textContent = active.filter(item => item.date.slice(0, 7) === today.slice(0, 7)).length;
}

function renderAppointments() {
  const all = appointments;
  const filtered = all.filter(item =>
    (!$('#filterBranch').value || item.branch === $('#filterBranch').value) &&
    (!$('#filterBarber').value || item.barber === $('#filterBarber').value) &&
    (!$('#filterDate').value || item.date === $('#filterDate').value)
  );
  $('#metricTotal').textContent = all.length;
  for (const [id, status] of [['metricPending', 'Pendiente'], ['metricConfirmed', 'Confirmada'], ['metricCancelled', 'Cancelada']]) {
    document.getElementById(id).textContent = all.filter(item => item.status === status).length;
  }
  renderPeriodSummary(all);
  const body = $('#appointmentRows');
  body.replaceChildren();
  for (const item of filtered) {
    const row = document.createElement('tr');
    const client = document.createElement('td');
    const name = document.createElement('strong');
    name.textContent = item.clientName;
    const note = document.createElement('small');
    note.textContent = 'PRUEBA';
    client.append(name, document.createElement('br'), note);
    row.append(client);
    for (const value of [branchName(item.branch), barberName(item.barber), serviceName(item.service), item.date, item.time]) {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.append(cell);
    }
    const statusCell = document.createElement('td');
    statusCell.className = 'status-cell';
    statusCell.dataset.status = item.status;
    const select = document.createElement('select');
    select.className = 'status-select';
    select.dataset.id = item.id;
    select.setAttribute('aria-label', `Estado de la cita de ${item.clientName}`);
    for (const status of ['Pendiente', 'Confirmada', 'Realizada', 'Cancelada']) {
      const choice = option(status, status);
      choice.selected = item.status === status;
      select.append(choice);
    }
    statusCell.append(select);
    row.append(statusCell);
    body.append(row);
  }
  $('#emptyAppointments').hidden = filtered.length > 0;
}

async function refreshAdmin() {
  try {
    const session = await api('/api/admin/session');
    $('#loginForm').hidden = session.authenticated;
    $('#adminContent').hidden = !session.authenticated;
    if (!session.authenticated) return;
    appointments = (await api('/api/admin/appointments')).appointments;
    renderAppointments();
  } catch (error) {
    $('#loginMessage').textContent = error.message;
  }
}

async function login(event) {
  event.preventDefault();
  try {
    await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ password: $('#adminPassword').value }) });
    $('#adminPassword').value = '';
    $('#loginMessage').textContent = '';
    await refreshAdmin();
  } catch (error) {
    $('#loginMessage').textContent = error.message;
  }
}

async function updateStatus(event) {
  if (!event.target.matches('.status-select')) return;
  const select = event.target;
  select.disabled = true;
  try {
    await api(`/api/admin/appointments/${select.dataset.id}`, { method: 'PATCH', body: JSON.stringify({ status: select.value }) });
    await refreshAdmin();
  } catch (error) {
    alert(error.message);
    await refreshAdmin();
  }
}

async function initialize() {
  $$('[data-view-link]').forEach(element => element.addEventListener('click', event => {
    event.preventDefault();
    showView(element.dataset.viewLink);
  }));
  $('#menuButton').addEventListener('click', () => {
    const open = $('#mainNav').classList.toggle('open');
    $('#menuButton').setAttribute('aria-expanded', String(open));
  });
  $('#branch').addEventListener('change', fillBarbers);
  for (const selector of ['#branch', '#service', '#barber', '#date']) {
    $(selector).addEventListener('change', () => { updateSummary(); refreshAvailability(); });
  }
  $('#bookingForm').addEventListener('submit', submitBooking);
  $('#loginForm').addEventListener('submit', login);
  $('#priceForm').addEventListener('submit', savePrices);
  $('#filterBranch').addEventListener('change', renderAppointments);
  $('#filterBarber').addEventListener('change', renderAppointments);
  $('#filterDate').addEventListener('change', renderAppointments);
  $('#appointmentRows').addEventListener('change', updateStatus);
  $('#logoutButton').addEventListener('click', async () => {
    await api('/api/admin/logout', { method: 'POST' });
    appointments = [];
    refreshAdmin();
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('.choose-branch');
    if (!button) return;
    $('#branch').value = button.dataset.branch;
    fillBarbers();
    updateSummary();
    refreshAvailability();
    showView('reservar');
  });
  try {
    populateContent(await api('/api/config'));
    updateSummary();
  } catch {
    $('#formMessage').textContent = 'No se pudo conectar al servidor. Inicia la aplicación con npm start.';
  }
}

document.addEventListener('DOMContentLoaded', initialize);
