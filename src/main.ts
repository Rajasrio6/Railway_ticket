import './style.css'

const API_BASE_URL = 'http://localhost:5000/api';

interface Train {
  id: number;
  operator: string;
  logo: string;
  duration: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  price: number;
  seatsLeft: number;
  facilities: string[];
  recommended: boolean;
  trainImage: string;
}

interface Booking {
  id: string;
  userId: number;
  trainId: number;
  status: string;
  bookingDate: string;
  train: Train;
}

// --- API Service ---
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.hash = 'login';
      }
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    return null;
  }
}

// --- Templates ---
const templates = {
  login: () => `
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
            <input type="email" placeholder="name@example.com" value="demo@easyticket.com">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value="password123">
          </div>
          <button type="submit" class="btn-select" style="width: 100%; height: 50px; font-size: 1rem;">Sign In</button>
        </form>
      </div>
    </div>
  `,
  browse: (trains: Train[]) => `
    <section class="search-container">
      <div class="input-group">
        <label>From</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></i>
          <input type="text" id="search-from" value="Berlin Hbf">
        </div>
      </div>
      <div class="input-group">
        <label>To</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/></svg></i>
          <input type="text" id="search-to" value="London St Pancras">
        </div>
      </div>
      <div class="input-group">
        <label>Departure Date</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></i>
          <input type="text" value="Wed 11 Sep">
        </div>
      </div>
      <div class="input-group">
        <label>Passengers</label>
        <div class="input-wrapper passenger-selector" id="passenger-toggle">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></i>
          <div class="passenger-display" id="passenger-display-text">1 Adult, 0 Kids</div>
          <div class="passenger-popover" id="passenger-popover">
            <div class="counter-row">
              <div class="counter-label">
                <span>Adults</span>
                <span>Ages 16+</span>
              </div>
              <div class="counter-controls">
                <button type="button" class="btn-counter" data-type="adults" data-action="minus" disabled>-</button>
                <span class="count-value" id="count-adults">1</span>
                <button type="button" class="btn-counter" data-type="adults" data-action="plus">+</button>
              </div>
            </div>
            <div class="counter-row">
              <div class="counter-label">
                <span>Kids</span>
                <span>Ages 0-15</span>
              </div>
              <div class="counter-controls">
                <button type="button" class="btn-counter" data-type="kids" data-action="minus" disabled>-</button>
                <span class="count-value" id="count-kids">0</span>
                <button type="button" class="btn-counter" data-type="kids" data-action="plus">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-group">
        <label>Seat class</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 13.5c0 1.4 1.1 2.5 2.5 2.5H16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H9.5C8.1 7 7 8.1 7 9.5Z"/><path d="M12 15V7"/></svg></i>
          <select><option>Business</option><option>Economy</option></select>
        </div>
      </div>
      <button class="btn-search" id="btn-search-main">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </button>
    </section>

    <aside class="sidebar">
      <div class="filter-section"><h3>Filters <span class="reset-link">Reset</span></h3></div>
      <div class="filter-section">
        <h3>Time</h3>
        <div class="filter-group">
          <label>Departure date</label>
          <div class="time-range">
            <input type="text" value="07:00 PM"> <span>→</span> <input type="text" value="18:00 PM">
          </div>
        </div>
      </div>
      <div class="filter-section">
        <h3>Facilities</h3>
        <div class="filter-group">
          <label class="checkbox-group"><input type="checkbox" checked> Wi-Fi</label>
          <label class="checkbox-group"><input type="checkbox" checked> Socket</label>
          <label class="checkbox-group"><input type="checkbox"> Meal</label>
          <label class="checkbox-group"><input type="checkbox"> Television</label>
        </div>
      </div>
      <button class="btn-select apply-filters">Apply Filters</button>
    </aside>

    <main class="results-container">
      <div class="results-header" style="margin-bottom: 1rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--text-main);">All Trains</h2>
      </div>
      ${trains.map(train => renderTicketCard(train)).join('')}
    </main>
  `,
  recommended: (trains: Train[]) => `
    <div class="page-header" style="grid-column: 1 / -1;">
      <h2>Recommended Journeys</h2>
      <p style="color: var(--text-muted);">Curated for your comfort and speed</p>
    </div>
    <main class="results-container" style="grid-column: 1 / -1;">
      ${trains.length > 0 ? trains.map(train => renderTicketCard(train)).join('') : '<p>No recommendations found.</p>'}
    </main>
  `,
  booking: (bookings: Booking[]) => `
    <div class="page-header" style="grid-column: 1 / -1;">
      <h2>My Bookings</h2>
    </div>
    <div class="booking-list" style="grid-column: 1 / -1;">
      ${bookings.length > 0 ? bookings.map(b => `
        <div class="booking-item">
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <div class="operator"><img src="${b.train.logo}" style="width: 30px;"></div>
            <div>
              <div style="font-weight: 600;">${b.train.origin} → ${b.train.destination}</div>
              <div style="font-size: 0.8rem; color: #64748b;">${b.id} • ${new Date(b.bookingDate).toLocaleDateString()}</div>
            </div>
          </div>
          <span class="status-badge status-${b.status.toLowerCase()}">${b.status}</span>
          <div style="font-weight: 700; color: #3b82f6;">$${b.train.price}.00</div>
          <button class="btn-cancel" data-id="${b.id}" style="background: none; border: none; color: #ef4444; cursor: pointer;">Cancel</button>
        </div>
      `).join('') : '<p style="grid-column: 1 / -1; color: var(--text-muted);">You have no bookings yet.</p>'}
    </div>
  `,
  scheduled: (bookings: Booking[]) => `
    <div class="page-header" style="grid-column: 1 / -1;">
      <h2>Scheduled Trips</h2>
    </div>
    <div class="booking-list" style="grid-column: 1 / -1;">
      ${bookings.length > 0 ? bookings.map(b => `
        <div class="booking-item">
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <div style="background: #eff6ff; padding: 0.75rem; border-radius: 0.75rem; color: #3b82f6;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div>
              <div style="font-weight: 600;">${b.train.origin} → ${b.train.destination}</div>
              <div style="font-size: 0.8rem; color: #64748b;">Reserved for ${new Date(b.bookingDate).toLocaleDateString()}</div>
            </div>
          </div>
          <button class="btn-select">View Details</button>
        </div>
      `).join('') : '<p style="grid-column: 1 / -1; color: var(--text-muted);">No scheduled trips found.</p>'}
    </div>
  `,
  history: (bookings: Booking[]) => `
    <div class="page-header" style="grid-column: 1 / -1;">
      <h2>Journey History</h2>
    </div>
    <div class="booking-list" style="grid-column: 1 / -1;">
      ${bookings.length > 0 ? bookings.map(b => `
        <div class="booking-item">
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <div><b>${new Date(b.bookingDate).getFullYear()}</b></div>
            <div>
              <div style="font-weight: 600;">${b.train.origin} → ${b.train.destination}</div>
              <div style="font-size: 0.8rem; color: #64748b;">Completed on ${new Date(b.bookingDate).toLocaleDateString()}</div>
            </div>
          </div>
          <div style="color: #64748b;">$${b.train.price}.00</div>
        </div>
      `).join('') : '<p style="grid-column: 1 / -1; color: var(--text-muted);">No journey history found.</p>'}
    </div>
  `
};

function renderTicketCard(train: Train) {
  return `
    <div class="ticket-card">
      <div class="train-image-container">
        <img src="${train.trainImage}" alt="${train.operator}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 12px 12px 0 0;">
      </div>
      <div class="ticket-header" style="padding-top: 1rem;">
        <div class="operator"><img src="${train.logo}"> ${train.operator}</div>
        <div class="duration">Duration ${train.duration}</div>
      </div>
      <div class="timeline">
        <div class="time-box"><span class="time">${train.departureTime}</span><span class="station">${train.origin}</span><span class="date">Fr 20 Sep</span></div>
        <div class="timeline-track"><div class="stop" style="left: 30%"></div><div class="stop" style="left: 70%"></div></div>
        <div class="time-box" style="text-align: right;"><span class="time">${train.arrivalTime}</span><span class="station">${train.destination}</span><span class="date">Fr 20 Sep</span></div>
      </div>
      <div class="ticket-footer">
        <div class="facilities">
          ${train.facilities.map(f => `<div class="facility">${f}</div>`).join('')}
        </div>
        <div class="price-booking">
          <div class="seats-info">${train.seatsLeft} seats left</div>
          <div class="price"><span class="amount">$${train.price}</span><span class="price-sub">/ Includes tax & fees</span></div>
          <button class="btn-select" data-id="${train.id}">Select</button>
        </div>
      </div>
    </div>
  `;
}

// --- Router ---
async function navigate() {
  const hash = window.location.hash.substring(1) || 'browse';
  const app = document.getElementById('app');
  const appContent = document.getElementById('app-content');
  const header = document.querySelector('.header');

  if (!app || !appContent || !header) return;

  // Show loading state
  appContent.innerHTML = '<div style="grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; height: 100%; font-size: 1.5rem; color: var(--text-muted);">Loading...</div>';

  if (hash === 'login') {
    app.classList.add('no-sidebar');
    header.classList.add('hidden');
    appContent.innerHTML = templates.login();
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = (loginForm.querySelector('input[type="email"]') as HTMLInputElement).value;
        const password = (loginForm.querySelector('input[type="password"]') as HTMLInputElement).value;

        const response = await apiFetch<{ token: string, user: any }>('/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });

        if (response && response.token) {
          localStorage.setItem('token', response.token);
          window.location.hash = 'browse';
        } else {
          alert('Invalid credentials');
        }
      });
    }
  } else {
    app.classList.remove('no-sidebar');
    header.classList.remove('hidden');

    let content = '';
    if (hash === 'browse') {
      const trains = await apiFetch<Train[]>('/trains');
      content = templates.browse(trains || []);
    } else if (hash === 'recommended') {
      app.classList.add('no-sidebar');
      const trains = await apiFetch<Train[]>('/trains/recommended');
      content = templates.recommended(trains || []);
    } else if (hash === 'booking') {
      const bookings = await apiFetch<Booking[]>('/bookings');
      content = templates.booking(bookings || []);
    } else if (hash === 'scheduled') {
      const bookings = await apiFetch<Booking[]>('/bookings');
      // In a real app we'd filter for status === 'Upcoming'
      content = templates.scheduled(bookings || []);
    } else if (hash === 'history') {
      const bookings = await apiFetch<Booking[]>('/bookings');
      // In a real app we'd filter for status === 'Completed' or similar
      content = templates.history(bookings || []);
    } else {
      const templateFn = (templates as any)[hash];
      content = typeof templateFn === 'function' ? templateFn([]) : templates.browse([]);
    }

    appContent.innerHTML = content;

    // Update active nav link
    document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href')?.substring(1);
      if (href === hash) item.classList.add('active');
      else item.classList.remove('active');
    });

    wireUpEvents();
  }
}

// --- Passenger State ---
let passengerState = { adults: 1, kids: 0 };

function wireUpEvents() {
  // Passenger selector toggle
  const passengerToggle = document.getElementById('passenger-toggle');
  const passengerPopover = document.getElementById('passenger-popover');
  const passengerDisplayText = document.getElementById('passenger-display-text');

  if (passengerToggle && passengerPopover) {
    passengerToggle.addEventListener('click', (e) => {
      // Don't close if clicking inside popover buttons
      if ((e.target as HTMLElement).closest('.btn-counter')) return;
      passengerPopover.classList.toggle('show');
      e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
      if (!passengerToggle.contains(e.target as Node)) {
        passengerPopover.classList.remove('show');
      }
    });

    document.querySelectorAll('.btn-counter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = btn.getAttribute('data-type') as 'adults' | 'kids';
        const action = btn.getAttribute('data-action');

        if (action === 'plus') passengerState[type]++;
        else if (action === 'minus' && passengerState[type] > (type === 'adults' ? 1 : 0)) passengerState[type]--;

        // Update UI
        const countEl = document.getElementById(`count-${type}`);
        if (countEl) countEl.textContent = passengerState[type].toString();

        // Update display text
        if (passengerDisplayText) {
          passengerDisplayText.textContent = `${passengerState.adults} Adult${passengerState.adults > 1 ? 's' : ''}, ${passengerState.kids} Kid${passengerState.kids !== 1 ? 's' : ''}`;
        }

        // Update button disabled states
        const minusBtn = btn.parentElement?.querySelector('[data-action="minus"]') as HTMLButtonElement;
        if (minusBtn) {
          minusBtn.disabled = type === 'adults' ? passengerState.adults <= 1 : passengerState.kids <= 0;
        }
      });
    });
  }

  // Tab pills
  document.querySelectorAll('.tab-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      if (pill.textContent?.trim() === 'Recommended') {
        window.location.hash = 'recommended';
        return;
      }
      document.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Select buttons (Create Booking)
  document.querySelectorAll<HTMLElement>('.btn-select').forEach(btn => {
    btn.addEventListener('click', async () => {
      const trainId = btn.getAttribute('data-id');
      if (!trainId) return;

      btn.textContent = 'Booking...';
      const result = await apiFetch('/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trainId: parseInt(trainId) })
      });

      if (result) {
        btn.textContent = 'Booked ✓';
        btn.style.background = '#10b981';
        setTimeout(() => {
          window.location.hash = 'booking';
        }, 1000);
      } else {
        btn.textContent = 'Failed ✗';
        btn.style.background = '#ef4444';
        setTimeout(() => { btn.textContent = 'Select'; btn.style.background = ''; }, 2000);
      }
    });
  });

  // Cancel buttons
  document.querySelectorAll<HTMLElement>('.btn-cancel').forEach(btn => {
    btn.addEventListener('click', async () => {
      const bookingId = btn.getAttribute('data-id');
      if (!bookingId) return;

      if (confirm('Are you sure you want to cancel this booking?')) {
        const result = await apiFetch(`/bookings/${bookingId}`, { method: 'DELETE' });
        if (result) navigate();
      }
    });
  });

  // Search functionality
  const searchBtn = document.getElementById('btn-search-main');
  if (searchBtn) {
    searchBtn.addEventListener('click', async () => {
      const from = (document.getElementById('search-from') as HTMLInputElement).value;
      const to = (document.getElementById('search-to') as HTMLInputElement).value;
      const appContent = document.getElementById('app-content');
      if (appContent) {
        appContent.innerHTML = '<div style="grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; height: 100%; font-size: 1.5rem; color: var(--text-muted);">Searching...</div>';
        const trains = await apiFetch<Train[]>('/trains/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ from, to })
        });
        const app = document.getElementById('app');
        if (app) app.classList.remove('no-sidebar');
        appContent.innerHTML = templates.browse(trains || []);
        wireUpEvents();
      }
    });
  }
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);

console.log('easyticket initialized!');
