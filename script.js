const EVENTS = [
  {
    id: 1,
    name: "RoboWars Arena",
    cat: "Tech",
    date: "2026-11-21T10:00",
    venue: "Main Auditorium",
    emoji: "🤖",
    c: ["#2b3cff", "#7c3aed"],
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    desc: "Build, battle and win in the campus robotics showdown.",
    long: "Teams bring their bots for knockout rounds judged on design, control and sheer toughness. Arduino and ROS entries welcome. Prizes for the top three teams."
  },
  {
    id: 2,
    name: "Midnight Acoustic Night",
    cat: "Music",
    date: "2026-11-27T19:00",
    venue: "Open Air Theatre",
    emoji: "🎸",
    c: ["#f43f5e", "#fb923c"],
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    desc: "Live unplugged sets from student bands and guest artists.",
    long: "Bring a blanket and enjoy three hours of unplugged music. Food stalls open from 6 PM. Gates close at 7:30 PM."
  },
  {
    id: 3,
    name: "CFD with ANSYS Workshop",
    cat: "Workshop",
    date: "2026-12-05T09:30",
    venue: "Lab Block C",
    emoji: "🌀",
    c: ["#0ea5e9", "#2563eb"],
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    desc: "Hands-on meshing and flow simulation, start to finish.",
    long: "Learn geometry cleanup, meshing, boundary conditions and post-processing on real examples. Laptops with ANSYS are provided."
  },
  {
    id: 4,
    name: "Inter-College Football Cup",
    cat: "Sports",
    date: "2026-12-12T15:00",
    venue: "Central Ground",
    emoji: "⚽",
    c: ["#16a34a", "#65a30d"],
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    desc: "Eight teams, one trophy, a full day of football.",
    long: "Seven-a-side knockout format. Teams must register with a roster of ten. Referees and first aid are on site."
  },
  {
    id: 5,
    name: "Sketch & Sip Art Jam",
    cat: "Art",
    date: "2026-12-18T16:00",
    venue: "Design Studio",
    emoji: "🎨",
    c: ["#d946ef", "#f59e0b"],
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    desc: "A relaxed evening of live sketching and colour.",
    long: "All materials included. Pick a prompt, draw alongside others and take your piece home. No experience needed."
  },
  {
    id: 6,
    name: "SpaceTech Hackathon",
    cat: "Tech",
    date: "2027-01-09T09:00",
    venue: "Innovation Hub",
    emoji: "🛰️",
    c: ["#4f46e5", "#0f172a"],
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    desc: "24 hours to prototype a CubeSat payload or ground tool.",
    long: "Teams of up to four. Mentors from the aerospace club guide you through payload design, telemetry and data handling."
  },
  {
    id: 7,
    name: "Winter Beats Festival",
    cat: "Music",
    date: "2027-01-16T18:00",
    venue: "Convention Centre",
    emoji: "🎧",
    c: ["#7c3aed", "#ec4899"],
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    desc: "DJs, a dance floor and light shows that run late.",
    long: "Headline DJ sets, a silent disco corner and food trucks. Valid college ID required for entry."
  },
  {
    id: 8,
    name: "Photography Walk",
    cat: "Art",
    date: "2027-01-24T06:30",
    venue: "Old Town Heritage Trail",
    emoji: "📷",
    c: ["#0d9488", "#0369a1"],
    img: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
    desc: "Golden-hour street photography with a guided route.",
    long: "Meet at sunrise for a three-hour guided walk. Bring any camera, phone cameras are fine. Tips on composition and editing included."
  },
  {
    id: 9,
    name: "Resume & Interview Clinic",
    cat: "Workshop",
    date: "2027-02-06T11:00",
    venue: "Seminar Hall 2",
    emoji: "📝",
    c: ["#ea580c", "#dc2626"],
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    desc: "One-on-one resume reviews and mock interviews.",
    long: "Get your resume checked for ATS fit and practise answers with industry mentors. Bring a printed copy and a digital copy."
  }
];

const $ = s => document.querySelector(s);
const KEY = "stubby_regs";
// ↓↓↓ PASTE YOUR WEB3FORMS ACCESS KEY HERE ↓↓↓
const WEB3FORMS_ACCESS_KEY = "c4863cd4-7659-480b-8dc5-b02eb1a70756";

let cat = "All", q = "", current = null;

const fmt = d => new Date(d).toLocaleString("en-IN", {
  weekday: "short", day: "numeric", month: "short", year: "numeric",
  hour: "numeric", minute: "2-digit"
});
const esc = s => s.replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));
const upcoming = () => EVENTS
  .filter(e => new Date(e.date) > Date.now())
  .sort((a, b) => new Date(a.date) - new Date(b.date));
const grad = e => `background:linear-gradient(135deg,${e.c[0]},${e.c[1]})`;
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
const save = a => { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch {} };

// theme
const root = document.documentElement;
function setTheme(t) {
  root.dataset.theme = t;
  $("#theme").textContent = t === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("stubby_theme", t); } catch {}
}
let saved = null;
try { saved = localStorage.getItem("stubby_theme"); } catch {}
setTheme(saved || (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light"));
$("#theme").onclick = () => setTheme(root.dataset.theme === "dark" ? "light" : "dark");
$("#burger").onclick = e => {
  const o = $("#menu").classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", o);
};
$("#menu").onclick = () => $("#menu").classList.remove("open");

// countdown
function cdHTML(date) {
  let s = Math.max(0, Math.floor((new Date(date) - Date.now()) / 1000));
  return [["days", 86400], ["hrs", 3600], ["min", 60], ["sec", 1]]
    .map(([l, n]) => {
      const x = Math.floor(s / n);
      s %= n;
      return `<div>${String(x).padStart(2, "0")}<span>${l}</span></div>`;
    }).join("");
}
function tick() {
  const n = upcoming()[0];
  if (n) $("#heroCd").innerHTML = cdHTML(n.date);
  if (current) $("#mCd").innerHTML = cdHTML(current.date);
}
function renderHero() {
  const n = upcoming()[0];
  if (!n) {
    $("#heroName").textContent = "No events scheduled";
    $("#heroBtn").hidden = true;
    return;
  }
  $("#heroName").textContent = n.name;
  $("#heroMeta").textContent = `${fmt(n.date)} at ${n.venue}`;
  $("#heroBtn").onclick = () => openModal(n.id);
}

// events
function renderChips() {
  const cats = ["All", ...new Set(EVENTS.map(e => e.cat))];
  $("#chips").innerHTML = cats.map(c =>
    `<button class="chip" aria-pressed="${c === cat}" data-c="${c}">${c}</button>`
  ).join("");
}
$("#chips").onclick = e => {
  const c = e.target.dataset.c;
  if (!c) return;
  cat = c;
  renderChips();
  renderGrid();
};
$("#search").oninput = e => {
  q = e.target.value.trim().toLowerCase();
  renderGrid();
};

function renderGrid() {
  const list = upcoming().filter(e =>
    (cat === "All" || e.cat === cat) &&
    (e.name + e.venue + e.desc + e.cat).toLowerCase().includes(q)
  );
  $("#count").textContent = `${list.length} event${list.length === 1 ? "" : "s"} found`;
  $("#grid").innerHTML = list.length
    ? list.map(e => `
      <article class="card">
        <div class="cover" style="${grad(e)}">
          <img src="${e.img}" alt="" loading="lazy" onerror="this.style.display='none'">
          <b>${e.cat}</b>
          <span class="emoji">${e.emoji}</span>
        </div>
        <div class="card-body">
          <h3>${e.name}</h3>
          <p>📅 ${fmt(e.date)}</p>
          <p>📍 ${e.venue}</p>
          <p>${e.desc}</p>
          <button class="btn" data-id="${e.id}">View details</button>
        </div>
      </article>`).join("")
    : `<p class="empty">No events match your search. Try a different word or choose "All".</p>`;
}
$("#grid").onclick = e => {
  const id = e.target.dataset.id;
  if (id) openModal(+id);
};

// modal
let lastFocus;
function openModal(id) {
  current = EVENTS.find(e => e.id === id);
  lastFocus = document.activeElement;
  const cover = $("#mCover");
  cover.style.cssText = grad(current);
  cover.innerHTML = `<img src="${current.img}" alt="" loading="lazy" onerror="this.style.display='none'"><span class="emoji">${current.emoji}</span>`;
  $("#mTitle").textContent = current.name;
  $("#mMeta").textContent = `${fmt(current.date)} · ${current.venue} · ${current.cat}`;
  $("#mDesc").textContent = current.long;
  $("#modal").hidden = false;
  document.body.style.overflow = "hidden";
  tick();
  $("#mClose").focus();
}
function closeModal() {
  $("#modal").hidden = true;
  current = null;
  document.body.style.overflow = "";
  lastFocus && lastFocus.focus();
}
$("#mClose").onclick = closeModal;
$("#modal").onclick = e => { if (e.target.id === "modal") closeModal(); };
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !$("#modal").hidden) closeModal();
});
$("#mReg").onclick = () => {
  const id = current.id;
  closeModal();
  $("#event").value = id;
  $("#register").scrollIntoView();
  setTimeout(() => $("#name").focus({ preventScroll: true }), 400);
};

// form
function fillSelect() {
  $("#event").innerHTML = `<option value="">Choose an event</option>` +
    upcoming().map(e => `<option value="${e.id}">${e.name}</option>`).join("");
}

const rules = {
  name: v => /^[A-Za-z][A-Za-z .'-]{2,49}$/.test(v)
    ? "" : "Enter your full name (letters only, at least 3 characters).",
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
    ? "" : "Enter a valid email like name@example.com.",
  phone: v => /^(\+91[\s-]?)?[6-9]\d{9}$/.test(v)
    ? "" : "Enter a 10-digit mobile number starting with 6, 7, 8 or 9.",
  event: v => v ? "" : "Choose the event you want to attend."
};

function check(k) {
  const el = $("#" + k);
  const m = rules[k](el.value.trim());
  $("#e-" + k).textContent = m;
  el.classList.toggle("bad", !!m);
  el.setAttribute("aria-invalid", !!m);
  return !m;
}

Object.keys(rules).forEach(k => {
  $("#" + k).addEventListener("blur", () => check(k));
  $("#" + k).addEventListener("input", () => {
    if ($("#" + k).classList.contains("bad")) check(k);
  });
});

$("#form").addEventListener("submit", async e => {
  e.preventDefault();
  const valid = Object.keys(rules).map(check).every(Boolean);
  if (!valid) {
    document.querySelector(".bad").focus();
    return;
  }

  const ev = EVENTS.find(x => x.id == $("#event").value);
  const email = $("#email").value.trim().toLowerCase();
  const name = $("#name").value.trim();
  const phone = $("#phone").value.trim();
  const regs = load();

  if (regs.some(r => r.email === email && r.eventId === ev.id)) {
    $("#e-event").textContent = "This email is already registered for that event.";
    $("#event").classList.add("bad");
    return;
  }

  const tid = "STB-" + Date.now().toString(36).toUpperCase();
  const r = { tid, name, email, phone, eventId: ev.id, at: Date.now() };

  regs.push(r);
  save(regs);

  let emailSent = false;
  if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== "YOUR_ACCESS_KEY_HERE") {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Stubby registration – ${ev.name}`,
          from_name: "Stubby Events",
          name,
          email,
          phone,
          event: ev.name,
          date: fmt(ev.date),
          venue: ev.venue,
          ticket_id: tid,
          message: `${name} registered for ${ev.name} on ${fmt(ev.date)} at ${ev.venue}. Ticket: ${tid}`
        })
      });
      const data = await res.json();
      emailSent = data.success === true;
    } catch (err) {
      console.warn("Email submission failed:", err);
    }
  }

  $("#ok").hidden = false;
  $("#ok").innerHTML = `
    <strong>You're in, ${esc(name.split(" ")[0])}!</strong><br>
    Ticket <code>${tid}</code> for <strong>${esc(ev.name)}</strong><br>
    ${fmt(ev.date)} at ${esc(ev.venue)}
    ${emailSent
      ? `<br><span class="sent">✓ Confirmation also sent to ${esc(email)}</span>`
      : `<br><span class="hint">Saved in this browser. Add a Web3Forms key to also receive email notifications.</span>`
    }`;
  $("#form").reset();
  renderTickets();
  $("#ok").scrollIntoView({ block: "center" });
});

function renderTickets() {
  const regs = load();
  $("#tickets").innerHTML = regs.length
    ? regs.map(r => {
        const ev = EVENTS.find(x => x.id === r.eventId);
        return `<div class="t">
          <div>
            <strong>${ev ? ev.name : "Unknown event"}</strong><br>
            <span class="small">${esc(r.name)} · ${r.tid}<br>${ev ? fmt(ev.date) : ""}</span>
          </div>
          <button data-t="${r.tid}">Cancel</button>
        </div>`;
      }).join("")
    : `<p class="small">No tickets yet. Pick an event above and register to see it here.</p>`;
}

$("#tickets").onclick = e => {
  const t = e.target.dataset.t;
  if (t && confirm("Cancel this registration?")) {
    save(load().filter(r => r.tid !== t));
    renderTickets();
  }
};

renderHero();
renderChips();
renderGrid();
fillSelect();
renderTickets();
tick();
setInterval(tick, 1000);