// 1. ANIMACIÓN DEL CORAZÓN
function animarCorazon() {
  const corazonBtn = document.getElementById('corazon-btn');
  corazonBtn.classList.add('llenar');

  setTimeout(() => {
    document.getElementById('pantalla-bienvenida').classList.add('hidden');
    document.getElementById('pantalla-principal').classList.remove('hidden');
    revisarScroll();
  }, 900);
}

// 2. REVELACIÓN AL HACER SCROLL
function revisarScroll() {
  const elementos = document.querySelectorAll('.fade-in-scroll');
  const alturaPantalla = window.innerHeight;

  elementos.forEach(el => {
    const posicionTop = el.getBoundingClientRect().top;
    if (posicionTop < alturaPantalla - 40) {
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
  const img = document.getElementById('img-carrusel');
  const contador = document.getElementById('contador-fotos');
  
  img.style.opacity = '0';

  setTimeout(() => {
    fotoActual += direccion;
    
    if (fotoActual < 0) {
      fotoActual = fotos.length - 1;
    } else if (fotoActual >= fotos.length) {
      fotoActual = 0;
    }

    img.src = fotos[fotoActual];
    contador.textContent = `${fotoActual + 1} / ${fotos.length}`;
    img.style.opacity = '1';
  }, 250);
}

// 4. CONTROL DE MÚSICA ("MI NIÑA BONITA")
function toggleMusica() {
  const audio = document.getElementById('cancion');
  const btn = document.querySelector('.btn-play');
  
  if (audio.paused) {
    audio.play();
    btn.textContent = '❚❚ Pausar';
  } else {
    audio.pause();
    btn.textContent = '▶ Reproducir';
  }
}

// 5. TRIVIA INTERACTIVA CON CONFETI
function responder(boton, esCorrecta) {
  if (esCorrecta) {
    boton.classList.add('correcta');
    
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    setTimeout(() => {
      document.getElementById('quiz-container').classList.add('hidden');
      document.getElementById('premio').classList.remove('hidden');
    }, 800);
  } else {
    boton.classList.add('incorrecta');
    setTimeout(() => {
      boton.classList.remove('incorrecta');
    }, 600);
  }
}