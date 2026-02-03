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
            <input type="email" id="login-email" placeholder="name@example.com" value="demo@easyticket.com">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="login-password" placeholder="••••••••" value="password123">
          </div>
          <button type="submit" class="btn-select" style="width: 100%; height: 50px; font-size: 1rem;">Sign In</button>
        </form>
        <p style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-muted);">
          Don't have an account? <a href="#signup" style="color: var(--primary); font-weight: 600; text-decoration: none;">Sign Up</a>
        </p>
      </div>
    </div>
  `,
  signup: () => `
    <div class="login-page">
      <div class="login-card">
        <div class="logo" style="justify-content: center; margin-bottom: 2rem; font-size: 1.5rem;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
          easyticket
        </div>
        <h2>Create an account</h2>
        <p>Join us to start booking your train tickets</p>
        <form id="signup-form">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="signup-name" placeholder="John Doe" required>
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="signup-email" placeholder="name@example.com" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="signup-password" placeholder="••••••••" required>
          </div>
          <button type="submit" class="btn-select" style="width: 100%; height: 50px; font-size: 1rem;">Sign Up</button>
        </form>
        <p style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-muted);">
          Already have an account? <a href="#login" style="color: var(--primary); font-weight: 600; text-decoration: none;">Sign In</a>
        </p>
      </div>
    </div>
  `,
  browse: (trains: Train[]) => `
    <section class="search-container">
      <div class="input-group">
        <label>From</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></i>
          <input type="text" id="search-from" id="search-from" placeholder="From where?" value="Berlin Hbf">
        </div>
      </div>
      <div class="input-group">
        <label>To</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/></svg></i>
          <input type="text" id="search-to" id="search-to" placeholder="To where?" value="London St Pancras">
        </div>
      </div>
      <div class="input-group">
        <label>Departure Date</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></i>
          <input type="text" value="Wed 11 Sep">
          <input type="text" id="search-date" value="2026-09-20">
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
          <select id="search-passengers"><option>1 adult</option><option>2 adults</option></select>
        </div>
      </div>
      <div class="input-group">
        <label>Seat class</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 13.5c0 1.4 1.1 2.5 2.5 2.5H16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H9.5C8.1 7 7 8.1 7 9.5Z"/><path d="M12 15V7"/></svg></i>
          <select>
            <option>Economy</option>
            <option>Premium Economy</option>
            <option>Business</option>
            <option>First Class</option>
            <option>Sleeper</option>
          </select>
          <select id="search-class"><option>Economy</option><option>Business</option></select>
        </div>
      </div>
      <button class="btn-search" id="btn-search-main">
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
      <div class="results-header" style="margin-bottom: 1rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--text-main);">All Trains</h2>
      <div class="tabs-filter">
        <div class="tab-pill active" data-sort="cheapest">Cheapest</div>
        <div class="tab-pill" data-sort="recommended">Recommended</div>
        <div class="seats-left"><span id="count-label">Searching...</span> <div class="btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></div></div>
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
      <div id="tickets-list">
        <!-- Ticket Cards will be injected here -->
        <div style="padding: 2rem; text-align: center; color: #64748b;">Loading available trains...</div>
      </div>
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
    <div id="booking-list" class="booking-list" style="grid-column: 1 / -1;">
      <div style="padding: 2rem; text-align: center; color: #64748b;">Fetching bookings...</div>
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
          <button class="btn-view-details" data-origin="${b.train.origin}" data-destination="${b.train.destination}" data-date="${new Date(b.bookingDate).toLocaleDateString()}" data-operator="${b.train.operator}">View Details</button>
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
  `,
  settings: () => `
    <div class="page-header" style="grid-column: 1 / -1;">
      <h2>Settings</h2>
      <p style="color: var(--text-muted);">Manage your account preferences</p>
    </div>
    <div class="settings-container" style="grid-column: 1 / -1; background: var(--bg-card); padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow);">
      <div class="settings-section" style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem;">Profile Settings</h3>
        <div class="form-group" style="max-width: 400px;">
          <label>Full Name</label>
          <input type="text" id="settings-name" value="Demo User">
        </div>
        <div class="form-group" style="max-width: 400px;">
          <label>Email Address</label>
          <input type="email" id="settings-email" value="demo@easyticket.com">
        </div>
      </div>
      <div class="settings-section" style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem;">Preferences</h3>
        <div class="filter-group">
          <label class="checkbox-group"><input type="checkbox" checked> Receive email notifications</label>
          <label class="checkbox-group"><input type="checkbox" checked> Show recommendations</label>
          <label class="checkbox-group"><input type="checkbox" id="dark-mode-toggle"> Dark mode</label>
        </div>
      </div>
      <button class="btn-select" id="btn-save-settings">Save Changes</button>
    </div>
  `,
  notifications: () => `
    <div class="page-header" style="grid-column: 1 / -1;">
      <h2>Notifications</h2>
    </div>
    <div class="booking-list" style="grid-column: 1 / -1;">
      <div class="booking-item" style="gap: 1.5rem;">
        <div style="background: #eff6ff; padding: 0.75rem; border-radius: 0.75rem; color: #3b82f6;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div style="flex-grow: 1;">
          <div style="font-weight: 600;">Booking Confirmed</div>
          <div style="font-size: 0.8rem; color: #64748b;">Your ticket for Berlin → London has been successfully booked.</div>
        </div>
        <div style="font-size: 0.75rem; color: #64748b;">2h ago</div>
      </div>
      <div class="booking-item" style="gap: 1.5rem;">
        <div style="background: #fef3c7; padding: 0.75rem; border-radius: 0.75rem; color: #d97706;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </div>
        <div style="flex-grow: 1;">
          <div style="font-weight: 600;">Trip Reminder</div>
          <div style="font-size: 0.8rem; color: #64748b;">Your trip from Paris → Amsterdam is coming up in 24 hours.</div>
        </div>
        <div style="font-size: 0.75rem; color: #64748b;">Yesterday</div>
      </div>
    <div id="history-list" class="booking-list" style="grid-column: 1 / -1;">
      <div style="padding: 2rem; text-align: center; color: #64748b;">Loading history...</div>
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
  } else if (hash === 'signup') {
    app.classList.add('no-sidebar');
    header.classList.add('hidden');
    appContent.innerHTML = templates.signup();
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = (document.getElementById('signup-name') as HTMLInputElement).value;
        const email = (document.getElementById('signup-email') as HTMLInputElement).value;
        const password = (document.getElementById('signup-password') as HTMLInputElement).value;

        const response = await apiFetch<{ token: string, user: any }>('/users/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password })
        });

        if (response && response.token) {
          localStorage.setItem('token', response.token);
          window.location.hash = 'browse';
        } else {
          alert('Registration failed');
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
    } else if (hash === 'settings') {
      app.classList.add('no-sidebar');
      content = templates.settings();
    } else if (hash === 'notifications') {
      app.classList.add('no-sidebar');
      content = templates.notifications();
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
      btn.addEventListener('click', () => {
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
      // Logic for sorting can be added here
    });
  });
}

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

// View Details buttons
document.querySelectorAll<HTMLElement>('.btn-view-details').forEach(btn => {
  btn.addEventListener('click', () => {
    const origin = btn.getAttribute('data-origin');
    const destination = btn.getAttribute('data-destination');
    const date = btn.getAttribute('data-date');
    const operator = btn.getAttribute('data-operator');

    alert(`Journey Details:\nOperator: ${operator}\nRoute: ${origin} → ${destination}\nDate: ${date}\nStatus: Confirmed`);
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

// Settings: Save Button
const saveSettingsBtn = document.getElementById('btn-save-settings');
if (saveSettingsBtn) {
  saveSettingsBtn.addEventListener('click', () => {
    saveSettingsBtn.textContent = 'Saving...';
    setTimeout(() => {
      saveSettingsBtn.textContent = 'Saved ✓';
      saveSettingsBtn.style.background = '#10b981';
      setTimeout(() => {
        saveSettingsBtn.textContent = 'Save Changes';
        saveSettingsBtn.style.background = '';
      }, 2000);
    }, 800);
  });
}

// Settings: Dark Mode Toggle
const darkToggle = document.getElementById('dark-mode-toggle') as HTMLInputElement;
if (darkToggle) {
  darkToggle.checked = document.body.classList.contains('dark-mode');
  darkToggle.addEventListener('change', () => {
    if (darkToggle.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  });
}
}

// --- Initialize Theme ---
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  navigate();
});

console.log('easyticket initialized with backend integration!');
