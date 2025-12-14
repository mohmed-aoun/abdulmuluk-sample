const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));

const setActiveLink = (id) => {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href').slice(1) === id);
  });
};

// Update active nav link on scroll with deliberate selection
const observer = new IntersectionObserver((entries) => {
  const visibleEntries = entries.filter(entry => entry.isIntersecting);

  visibleEntries.forEach(entry => {
    entry.target.classList.add('visible');
  });

  if (visibleEntries.length) {
    const topEntry = visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    const id = topEntry.target.getAttribute('id');
    setActiveLink(id);
  }
}, {
  threshold: [0.35, 0.55, 0.75],
  rootMargin: '-12% 0px -20% 0px'
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
