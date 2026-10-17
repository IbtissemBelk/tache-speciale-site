// Tache Spéciale : rideaux d'ouverture, barre de navigation, menu mobile.
(function () {
  var body = document.body;
  var curtains = document.querySelector('.curtains');

  // Les rideaux s'ouvrent une seule fois, puis disparaissent du DOM.
  window.addEventListener('load', function () {
    requestAnimationFrame(function () { body.classList.add('is-open'); });
    setTimeout(function () { if (curtains) curtains.remove(); }, 2200);
  });

  var topbar = document.querySelector('.topbar');
  function onScroll() {
    topbar.classList.toggle('is-solid', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    topbar.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Fermer' : 'Menu';
  }
  toggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('is-open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });
})();
