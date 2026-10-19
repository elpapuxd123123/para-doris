// 1. ANIMACIÓN DEL CORAZÓN Y CAMBIO DE PANTALLA
function animarCorazon() {
    const corazonBtn = document.getElementById('corazon-btn');
    const bienvenida = document.getElementById('pantalla-bienvenida');
    const principal = document.getElementById('pantalla-principal');

    // Activa el llenado del corazón
    corazonBtn.classList.add('llenar');

    // Oculta la bienvenida y muestra el contenido principal
    setTimeout(() => {
        bienvenida.classList.add('hidden');
        bienvenida.classList.remove('active');

        principal.classList.add('active');
        principal.classList.remove('hidden');

        // Reproducir música
        const audio = document.getElementById('cancion');
        if (audio) {
            audio.play().catch(e => console.log("Audio block:", e));
        }

        // Forzamos la visibilidad de los primeros elementos
        revisarScroll();
    }, 800);
}

// 2. REVELACIÓN AL HACER SCROLL
function revisarScroll() {
    const elementos = document.querySelectorAll('.fade-in-scroll');
    const alturaPantalla = window.innerHeight;

    elementos.forEach(el => {
        const posicionTop = el.getBoundingClientRect().top;
        if (posicionTop < alturaPantalla - 30) {
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
    if (fotoActual >= fotos.length) {
        fotoActual = 0;
    }
    if (fotoActual < 0) {
        fotoActual = fotos.length - 1;
    }
    
    const carruselImg = document.getElementById('carrusel-img');
    if (carruselImg) {
        carruselImg.src = fotos[fotoActual];
    }
}

// Cambia automáticamente de foto cada 3.5 segundos
setInterval(() => {
    cambiarFoto(1);
}, 3500);

// 4. CONTROL DEL REPRODUCTOR DE MÚSICA
function reproducirMusica() {
    const cancion = document.getElementById('cancion');
    const btnPlay = document.getElementById('btn-play');

    if (cancion.paused) {
        cancion.play();
        if (btnPlay) btnPlay.innerText = '⏸ Pausar Canción';
    } else {
        cancion.pause();
        if (btnPlay) btnPlay.innerText = '▶ Escuchar nuestra canción';
    }
}

// 5. TRIVIA INTERACTIVA (3 PREGUNTAS)
const respuestasCorrectas = {
    p1: 'b',
    p2: 'b',
    p3: 'b'
};

function verificarTrivia() {
    let correctas = 0;
    const totalPreguntas = 3;

    for (let i = 1; i <= totalPreguntas; i++) {
        const opciones = document.getElementsByName('p' + i);
        for (let opcion of opciones) {
            if (opcion.checked && opcion.value === respuestasCorrectas['p' + i]) {
                correctas++;
            }
        }
    }

    const resultadoDiv = document.getElementById('resultado-trivia');
    if (resultadoDiv) {
        resultadoDiv.classList.remove('hidden');
        if (correctas === totalPreguntas) {
            resultadoDiv.style.backgroundColor = '#e8f5e9';
            resultadoDiv.style.color = '#2e7d32';
            resultadoDiv.innerHTML = '✨ ¡Increíble! Acertaste todas las preguntas. ¡Ganaste el Vale Especial!';
            
            const valeRegalo = document.getElementById('vale-regalo');
            if (valeRegalo) {
                valeRegalo.classList.remove('hidden');
            }
        } else {
            resultadoDiv.style.backgroundColor = '#ffebee';
            resultadoDiv.style.color = '#c62828';
            resultadoDiv.innerHTML = `Tuviste ${correctas} de ${totalPreguntas} correctas. ¡Inténtalo de nuevo, mi amor! 💕`;
        }
    }
}
