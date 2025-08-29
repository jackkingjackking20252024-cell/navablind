const API_BASE = "http://localhost:4000"; // later change when hosted

// ------------------- STAFF -------------------
async function addStaff() {
  const staffName = document.getElementById("staff-name").value.trim();
  if (!staffName) {
    alert("Staff name cannot be empty");
    return;
  }

  const res = await fetch(`${API_BASE}/staff`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: staffName })
  });
  const data = await res.json();

  renderStaffList(data.staffList);
  document.getElementById("staff-name").value = "";
}

async function renderStaffList(staffList = null) {
  if (!staffList) {
    const res = await fetch(`${API_BASE}/staff`);
    staffList = await res.json();
  }
  const ul = document.getElementById("staff-list");
  ul.innerHTML = "";
  staffList.forEach(staff => {
    const li = document.createElement("li");
    li.className = "staff-list-item";
    li.innerHTML = `<span>${staff.name}</span>`;
    ul.appendChild(li);
  });
}

// ------------------- DAILY ENTRIES -------------------
async function addDailyEntry() {
  const entry = {
    date: document.getElementById('entry-date').value,
    staff: document.getElementById('entry-staff').value,
    package: document.getElementById('entry-package').value,
    timeIn: document.getElementById('entry-time-in').value,
    timeOut: document.getElementById('entry-time-out').value,
    commission: parseFloat(document.getElementById('entry-commission').value),
    sales: parseFloat(document.getElementById('entry-sales').value),
    payment: document.getElementById('entry-payment').value,
    customerType: document.getElementById('entry-customer-type').value,
    gender: document.getElementById('entry-gender').value,
    booking: document.getElementById('entry-booking').checked
  };

  const res = await fetch(`${API_BASE}/entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry)
  });
  await res.json();

  renderDailyEntries();
}

async function renderDailyEntries() {
  const res = await fetch(`${API_BASE}/entries`);
  const entries = await res.json();

  const tbody = document.getElementById("daily-entries-table-body");
  tbody.innerHTML = "";
  entries.forEach((entry, i) => {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${entry.date}</td>
      <td>${entry.staff}</td>
      <td>${entry.package}</td>
      <td>${entry.timeIn}</td>
      <td>${entry.timeOut}</td>
      <td>${entry.commission.toFixed(2)}</td>
      <td>${entry.sales.toFixed(2)}</td>
      <td>${entry.payment}</td>
      <td class="text-center">${entry.booking ? "✅" : "❌"}</td>
    `;
  });
}

// ------------------- INIT -------------------
document.addEventListener("DOMContentLoaded", () => {
  renderStaffList();
  renderDailyEntries();
});