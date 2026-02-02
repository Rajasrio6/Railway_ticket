import './style.css'

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
  browse: `
    <section class="search-container">
      <div class="input-group">
        <label>From</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></i>
          <input type="text" value="London St Pancras">
        </div>
      </div>
      <div class="input-group">
        <label>To</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/></svg></i>
          <input type="text" value="Berlin Hbf">
        </div>
      </div>
      <div class="input-group">
        <label>Departure Date</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></i>
          <input type="text" value="Wed 11 Sep - Fr 20 Sep">
        </div>
      </div>
      <div class="input-group">
        <label>Passengers</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></i>
          <select><option>1 adult</option><option>2 adults</option></select>
        </div>
      </div>
      <div class="input-group">
        <label>Seat class</label>
        <div class="input-wrapper">
          <i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 13.5c0 1.4 1.1 2.5 2.5 2.5H16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H9.5C8.1 7 7 8.1 7 9.5Z"/><path d="M12 15V7"/></svg></i>
          <select><option>Business</option><option>Economy</option></select>
        </div>
      </div>
      <button class="btn-search">
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
      <div class="tabs-filter">
        <div class="tab-pill active">Cheapest</div>
        <div class="tab-pill">Recommended</div>
        <div class="seats-left">23 seats left <div class="btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></div></div>
      </div>
      <!-- Ticket Cards -->
      <div class="ticket-card">
        <div class="ticket-header">
          <div class="operator"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Eurostar_logo.svg/1200px-Eurostar_logo.svg.png"> Eurostar</div>
          <div class="duration">Duration 8h 10m</div>
        </div>
        <div class="timeline">
          <div class="time-box"><span class="time">14:30</span><span class="station">Berlin Hbf</span><span class="date">Fr 20 Sep</span></div>
          <div class="timeline-track"><div class="stop" style="left: 30%"></div><div class="stop" style="left: 70%"></div></div>
          <div class="time-box" style="text-align: right;"><span class="time">22:40</span><span class="station">London St Pancras</span><span class="date">Fr 20 Sep</span></div>
        </div>
        <div class="ticket-footer">
          <div class="facilities">
            <div class="facility">Socket</div><div class="facility">Wifi</div><div class="facility">TV</div>
          </div>
          <div class="price-booking">
            <div class="price"><span class="amount">$350</span><span class="price-sub">/ Includes tax & fees</span></div>
            <button class="btn-select">Select</button>
          </div>
        </div>
      </div>
    </main>
  `,
  booking: `
    <div class="page-header" style="grid-column: 1 / -1;">
      <h2>My Bookings</h2>
    </div>
    <div class="booking-list" style="grid-column: 1 / -1;">
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
      <div class="booking-item">
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <div class="operator"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/National_Rail_logo.svg/1024px-National_Rail_logo.svg.png" style="width: 30px;"></div>
          <div>
            <div style="font-weight: 600;">Manchester → London</div>
            <div style="font-size: 0.8rem; color: #64748b;">TK-11203 • Jan 25, 2026</div>
          </div>
        </div>
        <span class="status-badge status-completed">Completed</span>
        <div style="font-weight: 700; color: #3b82f6;">$45.00</div>
        <button class="btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button>
      </div>
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
    <div class="booking-list" style="grid-column: 1 / -1;">
      <div class="booking-item">
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <div><b>2025</b></div>
          <div>
            <div style="font-weight: 600;">Amsterdam → Brussels</div>
            <div style="font-size: 0.8rem; color: #64748b;">Completed on Dec 12, 2025</div>
          </div>
        </div>
        <div style="color: #64748b;">$89.00</div>
      </div>
      <div class="booking-item">
        <div style="display: flex; align-items: center; gap: 1.5rem;">
          <div><b>2025</b></div>
          <div>
            <div style="font-weight: 600;">Paris → London</div>
            <div style="font-size: 0.8rem; color: #64748b;">Completed on Nov 05, 2025</div>
          </div>
        </div>
        <div style="color: #64748b;">$110.00</div>
      </div>
    </div>
  `
};

// --- Router ---
function navigate() {
  const hash = window.location.hash.substring(1) || 'browse';
  const app = document.getElementById('app');
  const appContent = document.getElementById('app-content');
  const header = document.querySelector('.header');

  if (!app || !appContent || !header) return;

  if (hash === 'login') {
    app.classList.add('no-sidebar');
    header.classList.add('hidden');
    appContent.innerHTML = templates.login as string;

    // Add login event listener
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

    // Update active nav link
    document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href')?.substring(1);
      if (href === hash) item.classList.add('active');
      else item.classList.remove('active');
    });

    // Add generic interactivity (tab pills, buttons)
    wireUpEvents();
  }
}

function wireUpEvents() {
  // Tab pills
  document.querySelectorAll('.tab-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Select buttons
  document.querySelectorAll<HTMLElement>('.btn-select').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('apply-filters')) return;
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

console.log('easyticket initialized!');
