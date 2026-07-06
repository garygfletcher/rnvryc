const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const navGroups = document.querySelectorAll('.nav-group');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
});

navGroups.forEach((group) => {
  const button = group.querySelector('button');
  button.addEventListener('click', () => {
    const isOpen = group.classList.contains('open');
    navGroups.forEach((item) => {
      item.classList.remove('open');
      item.querySelector('button').setAttribute('aria-expanded', 'false');
    });
    group.classList.toggle('open', !isOpen);
    button.setAttribute('aria-expanded', String(!isOpen));
  });
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
    document.body.style.overflow = '';
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1050) {
    menuToggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
    document.body.style.overflow = '';
  }
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  document.body.classList.add('js-reveal');

  const revealGroups = [
    ['.admiral-feature', 'reveal reveal-left'],
    ['.club-overview', 'reveal reveal-right'],
    ['.programme-image', 'reveal reveal-image'],
    ['.programme-content', 'reveal'],
    ['.benefits-heading', 'reveal'],
    ['.exact-benefits li', 'reveal'],
    ['.experience-card', 'reveal reveal-image'],
    ['.events-heading', 'reveal'],
    ['.events-table tbody tr', 'reveal'],
    ['.join-heading', 'reveal'],
    ['.join-benefits p', 'reveal'],
    ['.eligibility-block > div', 'reveal'],
    ['.join-notices article', 'reveal'],
    ['.shop-heading', 'reveal'],
    ['.shop-card', 'reveal'],
    ['.blue-ensign-note', 'reveal']
  ];

  revealGroups.forEach(([selector, classNames]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add(...classNames.split(' '));
      element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 70}ms`);
    });
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -45px' });

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
}
