const BRANCHES = [
  { id: "centro", name: "Sucursal Centro", schedule: "Lun-Sáb · 10:00-20:00", address: "Dirección pendiente de confirmar" },
  { id: "norte", name: "Sucursal Norte", schedule: "Lun-Sáb · 10:00-20:00", address: "Dirección pendiente de confirmar" },
  { id: "oriente", name: "Sucursal Oriente", schedule: "Lun-Sáb · 10:00-20:00", address: "Dirección pendiente de confirmar" }
];

const SERVICES = [
  { id: "clasico", name: "Corte clásico", duration: 45, price: 250, description: "Corte personalizado y acabado." },
  { id: "barba", name: "Arreglo de barba", duration: 30, price: 150, description: "Perfilado y arreglo de barba." },
  { id: "combo", name: "Corte y barba", duration: 60, price: 350, description: "Servicio completo de corte y barba." },
  { id: "infantil", name: "Corte infantil", duration: 40, price: 200, description: "Corte para clientes infantiles." }
];

const TIME_SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
const STORAGE_KEY = "barber920_demo_appointments";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function money(value) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);
}

function branchName(id) {
  return BRANCHES.find((branch) => branch.id === id)?.name || id;
}

function serviceName(id) {
  return SERVICES.find((service) => service.id === id)?.name || id;
}

function getAppointments() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveAppointments(appointments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

function showView(id) {
  $$(".view").forEach((view) => {
    const active = view.id === id;
    view.hidden = !active;
    view.classList.toggle("active-view", active);
  });

  $$(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.viewLink === id);
  });

  $("#mainNav").classList.remove("open");
  $("#menuButton").setAttribute("aria-expanded", "false");

  if (id === "administracion") renderAppointments();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function populateContent() {
  $("#serviceCards").innerHTML = SERVICES.map((service) => `
    <article class="service-card">
      <p class="eyebrow">Servicio demo</p>
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <div class="service-meta"><span>${service.duration} min</span><span>${money(service.price)}</span></div>
    </article>
  `).join("");

  $("#branchCards").innerHTML = BRANCHES.map((branch, index) => `
    <article class="branch-card">
      <span class="branch-number">0${index + 1}</span>
      <h2>${branch.name}</h2>
      <ul>
        <li>${branch.schedule}</li>
        <li>${branch.address}</li>
        <li>Información simulada</li>
      </ul>
      <button class="button primary choose-branch" data-branch="${branch.id}">Elegir esta sucursal</button>
    </article>
  `).join("");

  const branchOptions = BRANCHES.map((branch) => `<option value="${branch.id}">${branch.name}</option>`).join("");
  $("#branch").insertAdjacentHTML("beforeend", branchOptions);
  $("#filterBranch").insertAdjacentHTML("beforeend", branchOptions);

  $("#service").insertAdjacentHTML("beforeend", SERVICES.map((service) =>
    `<option value="${service.id}">${service.name} · ${service.duration} min · ${money(service.price)}</option>`
  ).join(""));

  $("#time").insertAdjacentHTML("beforeend", TIME_SLOTS.map((time) => `<option value="${time}">${time}</option>`).join(""));

  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  $("#date").min = localToday;
}

function updateSummary() {
  const branch = BRANCHES.find((item) => item.id === $("#branch").value);
  const service = SERVICES.find((item) => item.id === $("#service").value);

  $("#summaryBranch").textContent = branch?.name || "Sin seleccionar";
  $("#summaryService").textContent = service?.name || "Selecciona un servicio";
  $("#summaryDuration").textContent = service ? `${service.duration} minutos` : "-";
  $("#summaryPrice").textContent = service ? money(service.price) : "-";
}

function validateAppointment(data) {
  const selectedDate = new Date(`${data.date}T12:00:00`);
  if (Number.isNaN(selectedDate.getTime())) return "Selecciona una fecha válida.";
  if (selectedDate.getDay() === 0) return "En esta demostración no hay servicio los domingos.";

  const duplicate = getAppointments().some((appointment) =>
    appointment.branch === data.branch &&
    appointment.date === data.date &&
    appointment.time === data.time &&
    appointment.status !== "Cancelada"
  );

  if (duplicate) return "Ese horario ya está ocupado en esta sucursal.";
  return "";
}

function submitBooking(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const data = Object.fromEntries(form.entries());
  const error = validateAppointment(data);

  if (error) {
    $("#formMessage").textContent = error;
    return;
  }

  const appointment = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    ...data,
    status: "Pendiente",
    createdAt: new Date().toISOString(),
    demo: true
  };

  const appointments = getAppointments();
  appointments.push(appointment);
  saveAppointments(appointments);

  $("#confirmationText").textContent =
    `${data.clientName}: ${serviceName(data.service)} en ${branchName(data.branch)}, ${data.date} a las ${data.time}.`;

  event.currentTarget.reset();
  $("#formMessage").textContent = "";
  updateSummary();
  showView("confirmacion");
}

function demoAppointments() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = new Date(tomorrow.getTime() - tomorrow.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  saveAppointments([
    { id: "demo-1", clientName: "Cliente Demo 1", phone: "0000000000", branch: "centro", service: "clasico", date, time: "11:00", status: "Pendiente", demo: true },
    { id: "demo-2", clientName: "Cliente Demo 2", phone: "0000000000", branch: "norte", service: "combo", date, time: "16:00", status: "Confirmada", demo: true }
  ]);
  renderAppointments();
}

function renderAppointments() {
  const branchFilter = $("#filterBranch").value;
  const dateFilter = $("#filterDate").value;
  const all = getAppointments();
  const filtered = all.filter((item) =>
    (!branchFilter || item.branch === branchFilter) &&
    (!dateFilter || item.date === dateFilter)
  );

  $("#metricTotal").textContent = all.length;
  $("#metricPending").textContent = all.filter((item) => item.status === "Pendiente").length;
  $("#metricConfirmed").textContent = all.filter((item) => item.status === "Confirmada").length;
  $("#metricCancelled").textContent = all.filter((item) => item.status === "Cancelada").length;

  $("#appointmentRows").innerHTML = filtered.map((item) => `
    <tr>
      <td><strong>${item.clientName}</strong><br><small>DEMO</small></td>
      <td>${branchName(item.branch)}</td>
      <td>${serviceName(item.service)}</td>
      <td>${item.date}</td>
      <td>${item.time}</td>
      <td>
        <select class="status-select" data-id="${item.id}" aria-label="Estado de la cita de ${item.clientName}">
          ${["Pendiente", "Confirmada", "Completada", "Cancelada"].map((status) =>
            `<option value="${status}" ${status === item.status ? "selected" : ""}>${status}</option>`
          ).join("")}
        </select>
      </td>
    </tr>
  `).join("");

  $("#emptyAppointments").hidden = filtered.length > 0;
}

function updateStatus(event) {
  if (!event.target.matches(".status-select")) return;
  const appointments = getAppointments();
  const appointment = appointments.find((item) => item.id === event.target.dataset.id);
  if (appointment) {
    appointment.status = event.target.value;
    saveAppointments(appointments);
    renderAppointments();
  }
}

function initialize() {
  populateContent();
  updateSummary();
  renderAppointments();

  $$("[data-view-link]").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      showView(element.dataset.viewLink);
    });
  });

  $("#menuButton").addEventListener("click", () => {
    const open = $("#mainNav").classList.toggle("open");
    $("#menuButton").setAttribute("aria-expanded", String(open));
  });

  $("#branch").addEventListener("change", updateSummary);
  $("#service").addEventListener("change", updateSummary);
  $("#bookingForm").addEventListener("submit", submitBooking);
  $("#filterBranch").addEventListener("change", renderAppointments);
  $("#filterDate").addEventListener("change", renderAppointments);
  $("#loadDemoData").addEventListener("click", demoAppointments);
  $("#appointmentRows").addEventListener("change", updateStatus);

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".choose-branch");
    if (!button) return;
    $("#branch").value = button.dataset.branch;
    updateSummary();
    showView("reservar");
  });
}

document.addEventListener("DOMContentLoaded", initialize);
