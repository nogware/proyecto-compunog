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
  } else {
    // Si está en el final, vuelve al principio
    position = 0;
  }
  track.style.transform = `translateX(${position}px)`;
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

function actualizarContadorCarrito() {
  const carrito = getCarrito();
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = total;
    cartCount.style.background = total > 0 ? '#e74c3c' : '#888';
  }
}

  // Carrito simple con localStorage
  function getCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  }

  function setCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function agregarAlCarrito(producto) {
    let carrito = getCarrito();
    // Si ya existe, suma cantidad
    const index = carrito.findIndex(item => item.id === producto.id);
    if (index > -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({...producto, cantidad: 1});
    }
    setCarrito(carrito);
    alert('¡Producto agregado al carrito!');
  }

  // Escucha clicks en todos los botones "Agregar al carrito"
  document.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', function() {
      const producto = {
        id: this.getAttribute('data-id'),
        nombre: this.getAttribute('data-nombre'),
        precio: this.getAttribute('data-precio')
      };
      agregarAlCarrito(producto);
      renderCarrito();
      actualizarContadorCarrito();
    });
  });

    // Mostrar carrito al hacer clic en el ícono
  const cartLink = document.querySelector('.cart-link');
  const carritoModal = document.getElementById('carrito-modal');
  const carritoLista = document.getElementById('carrito-lista');
  const cerrarCarrito = document.getElementById('cerrar-carrito');

  function getCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  }

  function renderCarrito() {
  const carrito = getCarrito();
  carritoLista.innerHTML = '';
  if (carrito.length === 0) {
    carritoLista.innerHTML = '<li>El carrito está vacío.</li>';
  } else {
    carrito.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.nombre} x${item.cantidad} - $${item.precio}
        <button class="eliminar-producto" data-id="${item.id}" style="margin-left:10px;">Eliminar</button>
      `;
      carritoLista.appendChild(li);
    });
    // Agrega eventos a los botones eliminar
    document.querySelectorAll('.eliminar-producto').forEach(btn => {
      btn.addEventListener('click', function() {
        eliminarDelCarrito(this.getAttribute('data-id'));
      });
    });
  }
}

// Agrega esta función después de renderCarrito:
function eliminarDelCarrito(id) {
  let carrito = getCarrito();
  carrito = carrito.filter(item => item.id !== id);
  setCarrito(carrito);
  renderCarrito();
  actualizarContadorCarrito();
}

function vaciarCarrito() {
  if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
    localStorage.removeItem('carrito');
    renderCarrito();
    actualizarContadorCarrito();
  }
}

const btnVaciarCarrito = document.getElementById('vaciar-carrito');
if (btnVaciarCarrito) {
  btnVaciarCarrito.addEventListener('click', vaciarCarrito);
}

  if (cartLink) {
    cartLink.addEventListener('click', function(e) {
      e.preventDefault();
      renderCarrito();
      carritoModal.style.display = 'block';
    });
  }

  if (cerrarCarrito) {
    cerrarCarrito.addEventListener('click', function() {
      carritoModal.style.display = 'none';
    });
  }

  

});

