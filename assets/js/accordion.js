function toggleAccordion(btn) {
  const content = btn.nextElementSibling;
  const isOpen = content.classList.contains('open');
  document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
  document.querySelectorAll('.accordion-btn').forEach(b => b.classList.remove('active'));
  if (!isOpen) {
    content.classList.add('open');
    btn.classList.add('active');
  }
}
