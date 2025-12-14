const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));

// Update active nav link on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').slice(1) === id);
      });
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.35
});

sections.forEach(section => {
  if (section) {
    observer.observe(section);
  }
});

// Ensure initial section visible when page loads at top
window.addEventListener('DOMContentLoaded', () => {
  const firstSection = document.querySelector('.section');
  if (firstSection) firstSection.classList.add('visible');
});
