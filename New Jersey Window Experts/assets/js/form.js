function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.textContent = '✓ Message Sent!';
  btn.style.backgroundColor = '#0A4923';
  setTimeout(() => {
    btn.textContent = 'Send My Request';
    btn.style.backgroundColor = '#119548';
  }, 3000);
}
