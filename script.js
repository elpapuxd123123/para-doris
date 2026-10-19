// 1. ANIMACIÓN DEL CORAZÓN Y CAMBIO DE PANTALLA
function animarCorazon() {
    const corazonBtn = document.getElementById('corazon-btn');
    const bienvenida = document.getElementById('pantalla-bienvenida');
    const principal = document.getElementById('pantalla-principal');

    if (corazonBtn) {
        corazonBtn.classList.add('llenar');
    }

    setTimeout(() => {
        if (bienvenida) bienvenida.classList.add('hidden');
        if (principal) principal.classList.remove('hidden');

        // Intentar reproducir música
        const audio = document.getElementById('cancion');
        const btnPlay = document.getElementById('btn-play');
        if (audio) {
            audio.play().then(() => {
                if (btnPlay) btnPlay.innerText = '⏸ Pausar Canción';
            }).catch(e => {
                console.log("Audio block:", e);
            });
        }

        // Forzar visibilidad
        revisarScroll();
    }, 600);
}

// 2. REVELACIÓN AL HACER SCROLL
function revisarScroll() {
    const elementos = document.querySelectorAll('.fade-in-scroll');
    const alturaPantalla = window.innerHeight;

    elementos.forEach(el => {
        const posicionTop = el.getBoundingClientRect().top;
        if (posicionTop < alturaPantalla + 100) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revisarScroll);

// 3. CARRUSEL CONTINUO (5 FOTOS)
const fotos = [
    'fotos/foto1.jpg',
    'fotos/foto2.jpg',
    'fotos/foto3.jpg',
    'fotos/foto4.jpg',
    'fotos/foto5.jpg'
];

let fotoActual = 0;

function cambiarFoto(direccion) {
    fotoActual += direccion;
    if (fotoActual >= fotos.length) fotoActual = 0;
    if (fotoActual < 0) fotoActual = fotos.length - 1;
    
    const carruselImg = document.getElementById('carrusel-img');
    const contador = document.getElementById('contador-fotos');
    
    if (carruselImg) carruselImg.src = fotos[fotoActual];
    if (contador) contador.innerText = `${fotoActual + 1} / ${fotos.length}`;
}

setInterval(() => {
    cambiarFoto(1);
}, 3500);

// 4. CONTROL DEL REPRODUCTOR DE MÚSICA
function reproducirMusica() {
    const cancion = document.getElementById('cancion');
    const btnPlay = document.getElementById('btn-play');

    if (cancion) {
        if (cancion.paused) {
            cancion.play();
            if (btnPlay) btnPlay.innerText = '⏸ Pausar Canción';
        } else {
            cancion.pause();
            if (btnPlay) btnPlay.innerText = '▶ Escuchar nuestra canción';
        }
    }
}

// 5. TRIVIA & SELECCIÓN DE PLAN
function responder(btn, esCorrecto) {
    if (esCorrecto) {
        btn.classList.add('correcta');
        if (typeof confetti === 'function') {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
        
        setTimeout(() => {
            const quizContainer = document.getElementById('quiz-container');
            const eleccionCita = document.getElementById('eleccion-cita');
            if (quizContainer) quizContainer.classList.add('hidden');
            if (eleccionCita) eleccionCita.classList.remove('hidden');
        }, 500);
    } else {
        btn.classList.add('incorrecta');
    }
}

function seleccionarPlan(nombrePlan) {
    const eleccionCita = document.getElementById('eleccion-cita');
    const premio = document.getElementById('premio');
    const planConfirmado = document.getElementById('plan-confirmado');

    if (eleccionCita) eleccionCita.classList.add('hidden');
    if (planConfirmado) planConfirmado.innerText = `❤️ Vale por: ${nombrePlan}`;
    if (premio) premio.classList.remove('hidden');

    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
    }
}
