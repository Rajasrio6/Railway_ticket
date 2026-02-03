import './style.css'

// --- API Helpers ---
const API_BASE_URL = 'http://localhost:5000/api';

async function fetchTrains(params: Record<string, string> = {}) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/trains?${query}`);
  const result = await response.json();
  return result.data;
}

function createTicketCard(train: any) {
  const statusClass = train.status === 'On Time' ? 'status-ontime' : 'status-delayed';
  const ratingStars = Array(5).fill(0).map((_, i) =>
    `<svg width="12" height="12" viewBox="0 0 24 24" fill="${i < Math.floor(train.rating) ? '#f59e0b' : 'none'}" stroke="#f59e0b" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  ).join('');

  return `
    <div class="ticket-card" data-id="${train.id}">
      <div class="ticket-header">
        <div class="operator">
          <img src="${train.operatorLogo}" alt="logo">
          <div class="operator-info">
            <span class="operator-name">${train.operator}</span>
            <span class="train-meta">${train.trainNumber} | ${train.trainName}</span>
          </div>
        </div>
        <div class="header-right">
          <div class="rating-box">${ratingStars} <span>${train.rating}</span></div>
          <div class="duration">⏱ ${train.duration}</div>
        </div>
      </div>
      <div class="timeline">
        <div class="time-box">
          <span class="time">${train.departureTime}</span>
          <span class="station">${train.from}</span>
          <span class="date">${train.date}</span>
        </div>
        <div class="timeline-track">
          <div class="status-indicator ${statusClass}">${train.status}</div>
          <div class="stop" style="left: 30%"></div>
          <div class="stop" style="right: 30%"></div>
        </div>
        <div class="time-box" style="text-align: right;">
          <span class="time">${train.arrivalTime}</span>
          <span class="station">${train.to}</span>
          <span class="date">${train.date}</span>
        </div>
      </div>
      <div class="ticket-footer">
        <div class="facilities">
          ${train.facilities.map((f: string) => `<div class="facility"><span>${f}</span></div>`).join('')}
        </div>
        <div class="price-booking">
          <div class="price">
            <span class="price-sub">From</span>
            <span class="amount">$${train.price}</span>
          </div>
          <button class="btn-select">Book Now</button>
        </div>
      </div>
    </div>
  `;
}


// --- Templates ---
const templates: Record<string, string> = {
  login: `
    <div class="login-page">
      <div class="login-card">
        <div class="logo" style="justify-content: center; margin-bottom: 2rem; font-size: 1.5rem;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
          easyticket
        </div>
        <h2>Welcome back</h2>
        <p>Enter your details to access your bookings</p>
        <form id="login-form">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="login-email" placeholder="name@example.com" value="demo@easyticket.com">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="login-password" placeholder="••••••••" value="password123">
          </div>
          <button type="submit" class="btn-select" style="width: 100%; height: 50px; font-size: 1rem;">Sign In</button>
        </form>
      </div>
    </div>
  `,
  browse: `
    <section class="search-container">
      <div class="input-group">
        <label>From</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></i>
          <input type="text" id="search-from" placeholder="From where?" value="London St Pancras">
        </div>
      </div>
      <div class="input-group">
        <label>To</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/></svg></i>
          <input type="text" id="search-to" placeholder="To where?" value="Berlin Hbf">
        </div>
      </div>
      <div class="input-group">
        <label>Departure Date</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></i>
          <input type="text" id="search-date" value="2026-09-20">
        </div>
      </div>
      <div class="input-group">
        <label>Passengers</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></i>
          <select id="search-passengers"><option>1 adult</option><option>2 adults</option></select>
        </div>
      </div>
      <div class="input-group">
        <label>Seat class</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 13.5c0 1.4 1.1 2.5 2.5 2.5H16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H9.5C8.1 7 7 8.1 7 9.5Z"/><path d="M12 15V7"/></svg></i>
          <select id="search-class"><option>Economy</option><option>Business</option></select>
        </div>
      </div>
      <button class="btn-search" id="btn-search-main">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </button>
    </section>

    <aside class="sidebar">
      <div class="filter-section">
        <h3>Facilities</h3>
        <div class="filter-group">
          <label class="checkbox-group"><input type="checkbox" id="filter-wifi" checked> Wi-Fi</label>
          <label class="checkbox-group"><input type="checkbox" id="filter-socket" checked> Socket</label>
          <label class="checkbox-group"><input type="checkbox" id="filter-meal"> Meal</label>
          <label class="checkbox-group"><input type="checkbox" id="filter-tv"> Television</label>
        </div>
      </div>
      <button class="btn-select apply-filters" id="btn-apply-filters">Apply Filters</button>
    </aside>

    <main class="results-container">
      <div class="tabs-filter">
        <div class="tab-pill active" data-sort="cheapest">Cheapest</div>
        <div class="tab-pill" data-sort="recommended">Recommended</div>
        <div class="seats-left"><span id="count-label">Searching...</span> <div class="btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></div></div>
      </div>
      <div id="tickets-list">
        <!-- Ticket Cards will be injected here -->
        <div style="padding: 2rem; text-align: center; color: #64748b;">Loading available trains...</div>
      </div>
    </main>
  `,
  booking: `
    <div class="page-header" style="grid-column: 1 / -1;">
      <h2>My Bookings</h2>
    </div>
    <div id="booking-list" class="booking-list" style="grid-column: 1 / -1;">
      <div style="padding: 2rem; text-align: center; color: #64748b;">Fetching bookings...</div>
    </div>
  `,
  scheduled: `
    <div class="page-header" style="grid-column: 1 / -1;">
      <h2>Scheduled Trips</h2>
    </div>
    <div class="booking-list" style="grid-column: 1 / -1;">
      <div class="booking-item">
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <div style="background: #eff6ff; padding: 0.75rem; border-radius: 0.75rem; color: #3b82f6;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div>
            <div style="font-weight: 600;">Berlin → Munich</div>
            <div style="font-size: 0.8rem; color: #64748b;">Reserved for Oct 15, 2026</div>
          </div>
        </div>
        <button class="btn-select">View Details</button>
      </div>
    </div>
  `,
  history: `
    <div class="page-header" style="grid-column: 1 / -1;">
      <h2>Journey History</h2>
    </div>
    <div id="history-list" class="booking-list" style="grid-column: 1 / -1;">
      <div style="padding: 2rem; text-align: center; color: #64748b;">Loading history...</div>
    </div>
  `
};

// --- Router ---
async function navigate() {
  const hash = window.location.hash.substring(1) || 'browse';
  const app = document.getElementById('app');
  const appContent = document.getElementById('app-content');
  const header = document.querySelector('.header');

  if (!app || !appContent || !header) return;

  if (hash === 'login') {
    app.classList.add('no-sidebar');
    header.classList.add('hidden');
    appContent.innerHTML = templates.login as string;

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.hash = 'browse';
      });
    }
  } else {
    app.classList.remove('no-sidebar');
    header.classList.remove('hidden');
    appContent.innerHTML = templates[hash as keyof typeof templates] || templates.browse;

    document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href')?.substring(1);
      if (href === hash) item.classList.add('active');
      else item.classList.remove('active');
    });

    if (hash === 'browse') {
      await performSearch();
    } else if (hash === 'history') {
      await loadHistory();
    } else if (hash === 'booking') {
      await loadBookings();
    }

    wireUpEvents();
  }
}

async function performSearch() {
  const from = (document.getElementById('search-from') as HTMLInputElement)?.value;
  const to = (document.getElementById('search-to') as HTMLInputElement)?.value;
  const wifi = (document.getElementById('filter-wifi') as HTMLInputElement)?.checked;
  const socket = (document.getElementById('filter-socket') as HTMLInputElement)?.checked;
  const meal = (document.getElementById('filter-meal') as HTMLInputElement)?.checked;
  const tv = (document.getElementById('filter-tv') as HTMLInputElement)?.checked;

  const ticketsList = document.getElementById('tickets-list');
  const countLabel = document.getElementById('count-label');
  if (!ticketsList) return;

  try {
    const trains = await fetchTrains({
      from,
      to,
      wifi: String(wifi),
      socket: String(socket),
      meal: String(meal),
      tv: String(tv)
    });

    if (countLabel) countLabel.textContent = `${trains.length} trains found`;

    if (trains.length === 0) {
      ticketsList.innerHTML = '<div style="padding: 2rem; text-align: center; color: #64748b;">No trains found for your search.</div>';
    } else {
      ticketsList.innerHTML = trains.map((t: any) => createTicketCard(t)).join('');
      wireUpTicketEvents();
    }
  } catch (err) {
    ticketsList.innerHTML = '<div style="padding: 2rem; text-align: center; color: #ef4444;">Error connecting to server. Please try again.</div>';
  }
}

async function loadHistory() {
  const historyList = document.getElementById('history-list');
  if (!historyList) return;
  try {
    const response = await fetch(`${API_BASE_URL}/history`);
    const result = await response.json();
    const data = result.data;
    historyList.innerHTML = data.map((h: any) => `
      <div class="booking-item">
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <div><b>${h.year}</b></div>
          <div>
            <div style="font-weight: 600;">${h.route}</div>
            <div style="font-size: 0.8rem; color: #64748b;">Completed on ${h.completedDate}</div>
          </div>
        </div>
        <div style="color: #64748b;">${h.price}</div>
      </div>
    `).join('');
  } catch (err) {
    historyList.innerHTML = 'Error loading history.';
  }
}

async function loadBookings() {
  const bookingList = document.getElementById('booking-list');
  if (!bookingList) return;
  // Fallback to static for now as bookings controller might not have data yet
  bookingList.innerHTML = `
    <div class="booking-item">
      <div style="display: flex; align-items: center; gap: 1.5rem;">
        <div class="operator"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Eurostar_logo.svg/1200px-Eurostar_logo.svg.png" style="width: 30px;"></div>
        <div>
          <div style="font-weight: 600;">London → Paris</div>
          <div style="font-size: 0.8rem; color: #64748b;">TK-98234 • March 12, 2026</div>
        </div>
      </div>
      <span class="status-badge status-upcoming">Upcoming</span>
      <div style="font-weight: 700; color: #3b82f6;">$120.00</div>
      <button class="btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button>
    </div>
  `;
}

function wireUpEvents() {
  document.getElementById('btn-search-main')?.addEventListener('click', performSearch);
  document.getElementById('btn-apply-filters')?.addEventListener('click', performSearch);

  document.querySelectorAll('.tab-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      // Logic for sorting can be added here
    });
  });
}

function wireUpTicketEvents() {
  document.querySelectorAll<HTMLElement>('.btn-select').forEach(btn => {
    btn.addEventListener('click', () => {
      const originalText = btn.textContent;
      btn.textContent = 'Selected ✓';
      btn.style.background = '#10b981';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 2000);
    });
  });
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);

console.log('easyticket initialized with backend integration!');
