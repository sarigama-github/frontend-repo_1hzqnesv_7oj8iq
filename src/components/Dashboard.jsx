import { useEffect, useState } from "react";

const api = import.meta.env.VITE_BACKEND_URL || "";

function Section({ title, children, action }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [leads, setLeads] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tasks, setTasks] = useState([]);

  async function load() {
    const [c, l, b, t] = await Promise.all([
      fetch(`${api}/clients`).then((r) => r.json()),
      fetch(`${api}/leads`).then((r) => r.json()),
      fetch(`${api}/bookings`).then((r) => r.json()),
      fetch(`${api}/tasks`).then((r) => r.json()),
    ]);
    setClients(c || []);
    setLeads(l || []);
    setBookings(b || []);
    setTasks(t || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function quickAddClient() {
    const first_name = prompt("Client first name?");
    if (!first_name) return;
    const last_name = prompt("Client last name?") || "";
    const email = prompt("Email (optional)") || null;
    await fetch(`${api}/clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name, last_name, email }),
    });
    load();
  }

  async function quickAddLead() {
    const source = prompt("Lead source?") || "web";
    await fetch(`${api}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source, stage: "new" }),
    });
    load();
  }

  async function quickAddTask() {
    const title = prompt("Task title?") || "Follow up";
    await fetch(`${api}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    load();
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">CRM Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Section title="Clients" action={<button onClick={quickAddClient} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Add</button>}>
          <ul className="space-y-2 text-blue-100 text-sm max-h-48 overflow-auto">
            {clients.map((c) => (
              <li key={c.id} className="flex justify-between">
                <span>{c.first_name} {c.last_name}</span>
                <span className="opacity-60">{c.email || ""}</span>
              </li>
            ))}
            {clients.length === 0 && <li className="opacity-60">No clients yet</li>}
          </ul>
        </Section>

        <Section title="Leads" action={<button onClick={quickAddLead} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Add</button>}>
          <ul className="space-y-2 text-blue-100 text-sm max-h-48 overflow-auto">
            {leads.map((l) => (
              <li key={l.id} className="flex justify-between">
                <span>{l.source || "lead"}</span>
                <span className="opacity-60">{l.stage}</span>
              </li>
            ))}
            {leads.length === 0 && <li className="opacity-60">No leads yet</li>}
          </ul>
        </Section>

        <Section title="Bookings">
          <ul className="space-y-2 text-blue-100 text-sm max-h-48 overflow-auto">
            {bookings.map((b) => (
              <li key={b.id} className="flex justify-between">
                <span>{b.status}</span>
                <span className="opacity-60">{b.payment_state}</span>
              </li>
            ))}
            {bookings.length === 0 && <li className="opacity-60">No bookings yet</li>}
          </ul>
        </Section>

        <Section title="Tasks" action={<button onClick={quickAddTask} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Add</button>}>
          <ul className="space-y-2 text-blue-100 text-sm max-h-48 overflow-auto">
            {tasks.map((t) => (
              <li key={t.id} className="flex justify-between">
                <span>{t.title}</span>
                <span className="opacity-60">{t.status || "open"}</span>
              </li>
            ))}
            {tasks.length === 0 && <li className="opacity-60">No tasks yet</li>}
          </ul>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Itineraries">
          <p className="text-blue-200/80 text-sm">Create day-by-day plans by linking suppliers and costs. (Prototype endpoints ready.)</p>
        </Section>

        <Section title="Payments & Invoices">
          <p className="text-blue-200/80 text-sm">Track payments against invoices and bookings with multi-currency support.</p>
        </Section>
      </div>
    </div>
  );
}
