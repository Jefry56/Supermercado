/* ============================
   CARRITO DE COMPRAS
============================ */
let carrito = [];

function agregarAlCarrito(nombre, precio) {  
    const existente = carrito.find(i => i.nombre === nombre);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    actualizarCarrito();
    abrirCarrito();
    const cont = document.getElementById('contador');
    cont.classList.add('rebote');
    setTimeout(() => cont.classList.remove('rebote'), 350);
}

function actualizarCarrito() {
    const totalItems = carrito.reduce((s, i) => s + i.cantidad, 0);
    const totalPrecio = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
    document.getElementById('contador').textContent = totalItems;
    document.getElementById('totalCarrito').textContent = 'L. ' + totalPrecio.toFixed(2);
    const itemsEl = document.getElementById('carritoItems');
    const footerEl = document.getElementById('carritoFooter');
    const vacioEl = document.getElementById('carritoVacio');

    if (carrito.length === 0) {
        itemsEl.innerHTML = '';
        itemsEl.appendChild(vacioEl);
        vacioEl.style.display = 'block';
        footerEl.style.display = 'none';
    } else {
        vacioEl.style.display = 'none';
        footerEl.style.display = 'block';
        itemsEl.innerHTML = carrito.map((item, idx) => `
            <div class="carrito-item">
                <div>
                    <div class="item-nombre">${item.nombre}</div>
                    <div class="item-precio">L. ${(item.precio * item.cantidad).toFixed(2)}</div>
                </div>
                <div class="item-controles">
                    <button onclick="cambiarCantidad(${idx}, -1)">−</button>
                    <span>${item.cantidad}</span>
                    <button onclick="cambiarCantidad(${idx}, 1)">+</button>
                    <button class="item-eliminar" onclick="eliminarItem(${idx})">✕</button>
                </div>
            </div>
        `).join('');
    }
}

function cambiarCantidad(idx, delta) {
    carrito[idx].cantidad += delta;
    if (carrito[idx].cantidad <= 0) carrito.splice(idx, 1);
    actualizarCarrito();
}

function eliminarItem(idx) {
    carrito.splice(idx, 1);
    actualizarCarrito();
}

function vaciarCarrito() {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        carrito = [];
        actualizarCarrito();
    }
}

function abrirCarrito() {
    document.getElementById('carritoPanel').classList.add('abierto');
    document.getElementById('overlay').classList.add('activo');
    document.body.style.overflow = 'hidden';
}

function cerrarCarrito() {
    document.getElementById('carritoPanel').classList.remove('abierto');
    document.getElementById('overlay').classList.remove('activo');
    document.body.style.overflow = '';
}

document.getElementById('btnCarrito').addEventListener('click', abrirCarrito);

/* ============================
   MENÚ HAMBURGUESA
============================ */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('activo');
    nav.classList.toggle('abierto');
});

document.querySelectorAll('.nav_menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('activo');
        nav.classList.remove('abierto');
    });
});

/* ============================
   NEWSLETTER
============================ */
function suscribir() {
    const nombre = document.getElementById('nlNombre').value.trim();
    const email  = document.getElementById('nlEmail').value.trim();
    if (!nombre || !email) {
        alert('Por favor completa tu nombre y correo electrónico.');
        return;
    }
    if (!email.includes('@')) {
        alert('Por favor ingresa un correo válido.');
        return;
    }
    alert('¡Gracias ' + nombre + '! Te has suscrito correctamente. 🎉\nPronto recibirás nuestras mejores ofertas.');
    document.getElementById('nlNombre').value = '';
    document.getElementById('nlEmail').value  = '';
}

/* ============================
   FORMULARIO DE CONTACTO
============================ */
function enviarMensaje(e) {
    e.preventDefault();
    const exito = document.getElementById('msgExito');
    exito.style.display = 'block';
    e.target.reset();
    setTimeout(() => { exito.style.display = 'none'; }, 6000);
}

/* ============================
   SCROLL REVEAL (animaciones)
============================ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================
   MODO OSCURO
============================ */
const darkToggle = document.getElementById('darkToggle');
const darkIcon   = darkToggle.querySelector('.dark-toggle-icon');
const DARK_KEY   = 'superfacil-dark-mode';

// Aplicar tema guardado o preferencia del sistema
function aplicarTema(oscuro) {
    if (oscuro) {
        document.body.classList.add('dark-mode');
        darkIcon.textContent = '☀️';
        darkToggle.title = 'Modo claro';
    } else {
        document.body.classList.remove('dark-mode');
        darkIcon.textContent = '🌙';
        darkToggle.title = 'Modo oscuro';
    }
}

// Leer preferencia guardada; si no existe, usar preferencia del sistema
const guardado = localStorage.getItem(DARK_KEY);
if (guardado !== null) {
    aplicarTema(guardado === 'true');
} else {
    const prefSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;
    aplicarTema(prefSistema);
}

// Toggle al hacer clic
darkToggle.addEventListener('click', () => {
    const estaOscuro = document.body.classList.contains('dark-mode');
    // Animación de giro al cambiar
    darkIcon.style.transform = 'rotate(360deg) scale(1.3)';
    setTimeout(() => { darkIcon.style.transform = ''; }, 450);
    aplicarTema(!estaOscuro);
    localStorage.setItem(DARK_KEY, String(!estaOscuro));
});
/* ============================
   MODAL INICIAR SESIÓN
============================ */
function abrirLogin() {
    document.getElementById('modalOverlay').classList.add('activo');
    document.getElementById('modalLogin').classList.add('activo');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('usuario').focus(), 300);
}

function cerrarLogin() {
    document.getElementById('modalOverlay').classList.remove('activo');
    document.getElementById('modalLogin').classList.remove('activo');
    document.body.style.overflow = '';
}

function submitLogin(e) {
    e.preventDefault();
    alert('¡Bienvenido! Sesión iniciada correctamente.');
    cerrarLogin();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarLogin();
});