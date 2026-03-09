function showPage(name) {
  // Hide all pages
  document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
  // Remove active from all nav tabs
  document.querySelectorAll('.nav-link').forEach(t => t.classList.remove('active'));

  // Show target page
  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');

  // Highlight active tab
  const tab = document.getElementById('tab-' + name);
  if (tab) tab.classList.add('active');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
}
