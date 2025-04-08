anime({
  targets: '.typing-animation',
  opacity: [0, 1],
  translateY: [-30, 0],
  duration: 2000,
  easing: 'easeOutExpo',
  delay: (el, i) => 500 + 100 * i
});

document.querySelectorAll('.cta-button, .about-button, .resume-button').forEach(button => {
  button.addEventListener('mouseenter', () => {
    anime({
      targets: button,
      scale: 1.1,
      duration: 300,
      easing: 'easeOutExpo'
    });
  });
  button.addEventListener('mouseleave', () => {
    anime({
      targets: button,
      scale: 1,
      duration: 300,
      easing: 'easeOutExpo'
    });
  });
});

const sections = document.querySelectorAll('section');
sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(50px)';
});

window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      anime({
        targets: section,
        opacity: 1,
        translateY: 0,
        duration: 1000,
        easing: 'easeOutExpo'
      });
    }
  });
});

