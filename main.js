(function () {
  'use strict';

  var MEDIA = 'https://static.wixstatic.com/media/';

  var HOUSES = [
    ['Balneário Camboriú', 'de892551906a4999841b76a39bc939e9'],
    ['Belém', 'c102d6da94e74ac5932662f6578dcef6'],
    ['Brasília', '5856493f41934362a10c0269c44121a5'],
    ['Cascavel', '88299fb96ffa4b9c93f24381c459ba36'],
    ['Concórdia', 'bb51cc45a1da487094c17984ced0b6d0'],
    ['Curitiba Batel', '9bfc868cdc654835b0c21b7c9206d49e'],
    ['Curitiba', 'cd95407f687e44adbc26ed70db9cad06'],
    ['Curitiba Mercadoteca', 'c32870bc560748afb40039c1e075a244'],
    ['Indaiatuba', '295d14ec60274a8cb5ab6d42b2bee62f'],
    ['Itapema', 'e1a2db48072a4624b1830b8cc124f5ff'],
    ['Rio Botafogo', '9fff7f6dd9e846679836de24543d5b39'],
    ['Rio Cidade Jardim', 'd6a0d6a93fa246d983f262dc6c828511'],
    ['Rio Copacabana', '5848de8d1c484ef3a7673ee6a22c17b0'],
    ['Rio Flamengo', '893559284f03495082585357cb92a9df'],
    ['Rio Ipanema', '4b7345d8b4114cd7af6d21662b48dc07'],
    ['SP Morumbi', '9878e5f4bd8741fda93a111956a0f44c'],
    ['SP Pinheiros', '8bad04ea18c14b5cb9d25ca8e4703123'],
    ['SP Vila Leopoldina', 'fc9418e93c82455dafba862c88592755'],
    ['Tatuapé', '5fc03bf5409642c7ba6c5c433c4cb188'],
    ['Umuarama', '40ace37b3a0b4a6c8e0c5239f26619e7']
  ];

  // [cidade, perfil do Instagram ou null]. Os perfis são os que o site original linka;
  // as demais cidades aparecem como texto simples, como no original.
  var UNITS = [
    { state: 'BAHIA', cities: [['Luis Eduardo Magalhães']] },
    { state: 'DISTRITO FEDERAL', cities: [['Brasília / Águas Claras']] },
    { state: 'GOIÁS', cls: 'vn-state--gap', cities: [['Goiânia']] },
    { state: 'MATO GROSSO', cities: [['Lucas do Rio Verde'], ['Rondonópolis']] },
    { state: 'MATO GROSSO DO SUL', cities: [['Campo Grande', 'vinocampogrande']] },
    { state: 'MINAS GERAIS', cities: [['Belo Horizonte / Cidade Nova'], ['Passos', 'vino.passos'], ['Pouso Alegre'], ['Uberlândia']] },
    { state: 'PARANÁ', cities: [['Campo Mourão', 'vinocampomourao'], ['Cascavel', 'vinocascavel'], ['Curitiba / Batel'], ['Curitiba / Cabral', 'vino.cabral'], ['Ponta Grossa', 'vinopontagrossa'], ['Toledo']] },
    { state: 'PIAUÍ', cls: 'vn-state--col2', cities: [['Teresina']] },
    { state: 'RIO DE JANEIRO', cities: [['Campos dos Goytacazes', 'vinocampos'], ['Rio / Barra Olímpica', 'vinorio_cidadejardim'], ['Rio / Vargem Grande'], ['Teresópolis']] },
    { state: 'RIO GRANDE DO SUL', cls: 'vn-state--gap', cities: [['Caxias do Sul'], ['Farroupilha'], ['Novo Hamburgo']] },
    { state: 'SANTA CATARINA', cls: 'vn-state--col3', cities: [['Balneário Camboriú'], ['Itapema'], ['Florianópolis / Mercadoteca Floripa', 'vino.mercadotecafloripa'], ['Itajaí', 'vino.itajai'], ['Joinville', 'vino.joinville']] },
    { state: 'SÃO PAULO', cities: [['Araçatuba'], ['Indaiatuba'], ['Jundiaí'], ['Marília', 'vinomarilia'], ['Osasco'], ['Paulínia'], ['Ribeirão Preto', 'vinoribeiraopreto'], ['São Bernardo do Campo', 'vino.saobernardo'], ['São José dos Campos'], ['São Paulo / Higienópolis', 'vinohigienopolis'], ['São Paulo / Mooca'], ['São Paulo / Morumbi', 'vinomorumbi'], ['São Paulo / Pinheiros', 'vinopinheiros'], ['São Paulo / Tatuapé', 'vinotatuape'], ['São Paulo / Vila Leopoldina'], ['Sorocaba', 'vinosorocaba'], ['Tatuí']] }
  ];

  var GALLERY = [
    '156d73d2b1b54486a0acac2dd22f2ea1',
    'd6a513a60ce749488d41c703cdbcb0e0',
    'eef3fba9caac43b79efa5ebfecfc927c',
    '9c7e6bd75a114a0497a800e9c0e80343',
    '9f805e6672664563b43da4ff01c0784a',
    '7596def6c3b4412f87d61840ecbb9564',
    '774044227f404a3cbb1c3183954ecc81',
    '85787a5451da42d38a4d417fe9de2c74',
    'b6da6f0cd2ae47dc955933f8b870a3bb',
    'a70c420bbc514531b106920e07d3b8be',
    '49751a5d2d524156bddbef55d3ccb64c'
  ];

  function el(tag, cls, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function renderHouses() {
    var grid = document.getElementById('vn-houses-grid');
    if (!grid) return;
    var frag = document.createDocumentFragment();
    HOUSES.forEach(function (h) {
      var li = el('li', 'vn-house');
      li.appendChild(el('img', 'vn-house__img', { src: MEDIA + 'ec593b_' + h[1] + '~mv2.jpg', alt: 'Vino! ' + h[0], loading: 'lazy' }));
      var cap = el('span', 'vn-house__name');
      cap.textContent = h[0];
      li.appendChild(cap);
      frag.appendChild(li);
    });
    grid.appendChild(frag);
  }

  function renderUnits() {
    var list = document.getElementById('vn-units-list');
    if (!list) return;
    var frag = document.createDocumentFragment();
    UNITS.forEach(function (g) {
      var box = el('div', 'vn-state' + (g.cls ? ' ' + g.cls : ''));
      var h = el('h3', 'vn-state__name');
      h.textContent = g.state;
      box.appendChild(h);
      var ul = el('ul', 'vn-state__cities');
      g.cities.forEach(function (c) {
        var li = el('li', 'vn-state__city');
        var item;
        if (c[1]) {
          item = el('a', 'vn-state__link', { href: 'https://www.instagram.com/' + c[1] + '/', target: '_blank', rel: 'noopener' });
        } else {
          item = el('span', 'vn-state__label');
        }
        item.textContent = c[0];
        li.appendChild(item);
        ul.appendChild(li);
      });
      box.appendChild(ul);
      frag.appendChild(box);
    });
    list.appendChild(frag);
  }

  function renderGallery() {
    var grid = document.getElementById('vn-gallery-grid');
    if (!grid) return;
    var frag = document.createDocumentFragment();
    GALLERY.forEach(function (id, i) {
      var fig = el('figure', 'vn-gitem vn-gitem--' + (i + 1));
      fig.appendChild(el('img', 'vn-gitem__img', { src: MEDIA + 'ec593b_' + id + '~mv2.jpg', alt: 'Ambiente Vino! ' + (i + 1), loading: 'lazy' }));
      frag.appendChild(fig);
    });
    grid.appendChild(frag);
  }

  function setupMenu() {
    var burger = document.querySelector('.vn-burger');
    var menu = document.getElementById('vn-mobile-menu');
    if (!burger || !menu) return;
    var closeBtn = menu.querySelector('.vn-mmenu__close');

    function open() {
      menu.hidden = false;
      requestAnimationFrame(function () { menu.classList.add('is-open'); });
      burger.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('vn-lock');
      closeBtn.focus();
    }
    function close() {
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('vn-lock');
      setTimeout(function () { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 250);
    }

    burger.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    menu.addEventListener('click', function (e) {
      if (e.target.closest('.vn-mmenu__link')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', function (mq) {
      if (mq.matches && menu.classList.contains('is-open')) close();
    });
  }

  function setupSmoothScroll() {
    var header = document.querySelector('.vn-header');
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      var target = id === 'topo' ? document.body : document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var offset = id === 'topo' ? 0 : target.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
      if (history.replaceState) history.replaceState(null, '', id === 'topo' ? location.pathname : '#' + id);
    });
  }

  // "Reveal" background effect from the Wix original: the photo stays pinned to the
  // viewport while its section scrolls over it. Desktop only, like the original.
  function setupParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var layers = [].slice.call(document.querySelectorAll('.vn-parallax'));
    if (!layers.length) return;
    var desktop = window.matchMedia('(min-width: 768px)');
    var ticking = false;

    function update() {
      ticking = false;
      var vh = window.innerHeight;
      layers.forEach(function (layer) {
        var img = layer.firstElementChild;
        if (!desktop.matches) { img.style.transform = ''; return; }
        var r = layer.getBoundingClientRect();
        if (r.bottom < -50 || r.top > vh + 50) return;
        img.style.transform = 'translate3d(0,' + (-r.top).toFixed(1) + 'px,0)';
      });
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', update);
    update();
  }

  function setupGallery() {
    var vp = document.getElementById('vn-gallery');
    if (!vp) return;
    var prev = document.querySelector('.vn-gallery__arrow--prev');
    var next = document.querySelector('.vn-gallery__arrow--next');

    function sync() {
      var max = vp.scrollWidth - vp.clientWidth - 2;
      prev.hidden = vp.scrollLeft <= 2;
      next.hidden = vp.scrollLeft >= max;
    }
    function go(dir) {
      vp.scrollBy({ left: dir * vp.clientWidth * 0.8, behavior: 'smooth' });
    }
    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    vp.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }

  renderHouses();
  renderUnits();
  renderGallery();
  setupMenu();
  setupSmoothScroll();
  setupParallax();
  setupGallery();
})();
