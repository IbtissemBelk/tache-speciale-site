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

// Packs mariée : prix (DT), numéro de pack et durée de privatisation selon la taille du groupe.
(function () {
  var PACKS = {
    10: { simple: [1, 1000, '2h'],   royal: [2, 1500, '3h'],  gold: [3, 1800, '3h'],  diamond: [4, 2500, '3h'] },
    15: { simple: [5, 1400, '2h30'], royal: [6, 1900, '3h'],  gold: [7, 2200, '3h'],  diamond: [8, 2800, '3h'] },
    25: { simple: [9, 1800, '2h30'], royal: [10, 2300, '3h'], gold: [11, 2500, '3h'], diamond: [12, 3400, '3h'] }
  };
  var NAMES = { simple: 'Simple', royal: 'Royal', gold: 'Gold', diamond: 'Diamond' };
  var cards = document.querySelectorAll('.pack[data-tier]');

  function render(size) {
    cards.forEach(function (card) {
      var tier = card.getAttribute('data-tier');
      var p = PACKS[size][tier];
      card.querySelector('[data-pack]').textContent = p[0];
      card.querySelector('[data-price]').textContent = p[1].toLocaleString('fr-FR');
      var d = card.querySelector('[data-duration]');
      if (d) d.textContent = p[2];
      card.querySelector('[data-size]').textContent = size;
      card.querySelector('[data-poster]').setAttribute('data-full',
        'media/packs/pack-' + (p[0] < 10 ? '0' : '') + p[0] + '.jpg');
      var msg = 'Bonjour, je souhaite réserver le Pack ' + p[0] + ' (' + NAMES[tier] + ', ' +
        size + ' personnes, ' + p[1] + ' DT) pour mon hammam de mariée.';
      card.querySelector('[data-book]').href = 'https://wa.me/21653335379?text=' + encodeURIComponent(msg);
    });
  }

  document.querySelectorAll('input[name="group"]').forEach(function (input) {
    input.addEventListener('change', function () { render(input.value); });
  });
  var checked = document.querySelector('input[name="group"]:checked');
  render(checked ? checked.value : 10);
})();

// Visionneuse : photos de la galerie et affiches des packs.
(function () {
  var box = document.querySelector('.lightbox');
  if (!box || !box.showModal) return;
  var img = document.createElement('img');
  box.insertBefore(img, box.firstChild);
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-full]');
    if (!trigger) return;
    var inner = trigger.querySelector('img');
    img.src = trigger.getAttribute('data-full');
    img.alt = inner ? inner.alt : trigger.textContent.trim();
    box.showModal();
  });
  box.querySelector('.lightbox__close').addEventListener('click', function () { box.close(); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
})();
