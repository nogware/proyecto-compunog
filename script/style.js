document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

// este escript se encarga de que el slider cambie de imagen cada 10 segundos
   const radios = [
    document.getElementById('slide1'),
    document.getElementById('slide2'),
    document.getElementById('slide3')
  ];
  let current = 0;
  setInterval(() => {
    current = (current + 1) % radios.length;
    radios[current].checked = true;
  }, 10000);

  // Carrusel de OFERTAS manual
  const track = document.querySelector('.articulos-track');
  const prev = document.querySelector('.articulos-prev');
  const next = document.querySelector('.articulos-next');
  const articulos = document.querySelectorAll('.articulo');
  let visibles = 4; // Cambia este valor si quieres mostrar otra cantidad
  let position = 0;

  function getArticuloWidth() {
    // Suma el ancho y el gap (ajusta si tu gap es diferente)
    const style = window.getComputedStyle(articulos[0]);
    const width = articulos[0].offsetWidth;
    const gap = parseInt(style.marginRight) || 5;
    return width + gap;
  }

  function moveNext() {
    const articuloWidth = getArticuloWidth();
    const maxPosition = -(articulos.length - visibles) * articuloWidth;
    if (position > maxPosition) {
      position -= articuloWidth;
      track.style.transform = `translateX(${position}px)`;
    }
  }

  function movePrev() {
    const articuloWidth = getArticuloWidth();
    if (position < 0) {
      position += articuloWidth;
      track.style.transform = `translateX(${position}px)`;
    }
  }

  if (next) next.addEventListener('click', moveNext);
  if (prev) prev.addEventListener('click', movePrev);

  // resetear posición al redimensionar ventana
  window.addEventListener('resize', () => {
    position = 0;
    track.style.transform = `translateX(0px)`;
  });
});

