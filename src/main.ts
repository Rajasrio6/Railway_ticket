import './style.css'

// Add interactivity for navigation
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});

// Add interactivity for tab pills
const tabPills = document.querySelectorAll('.tab-pill');
tabPills.forEach(pill => {
  pill.addEventListener('click', () => {
    tabPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
  });
});

// Interactivity for select buttons
const selectButtons = document.querySelectorAll('.btn-select');
selectButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const originalText = btn.textContent;
    btn.textContent = 'Selected ✓';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '#1e293b';
    }, 2000);
  });
});

console.log('easyticket initialized!');
