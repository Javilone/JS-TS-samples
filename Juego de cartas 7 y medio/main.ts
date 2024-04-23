import "./style.css";

// Variables de almacenamiento
let playerScore: number = 0;

// Elementos del DOM
const scoreDisplay = document.getElementById("score") as HTMLHeadingElement;
const cardBoard = document.getElementById("card-board") as HTMLDivElement;
const playBoard = document.getElementById("play-board") as HTMLDivElement;
const gameOverPanel = document.getElementById("mePlanto") as HTMLDivElement;
const shuffleButton = document.getElementById(
  "shuffle-button"
) as HTMLButtonElement;
const giveMeButton = document.getElementById(
  "giveMe-button"
) as HTMLButtonElement;
const plantarse = document.getElementById("giveUp-button") as HTMLButtonElement;
const newGameButton = document.getElementById(
  "newGame-button"
) as HTMLButtonElement;
const whatIfButton = document.getElementById("whatIf") as HTMLButtonElement;
const musicIcon = document.getElementById("musicIcon") as HTMLImageElement;

const shuffling = new Audio("/src/sounds/shuffling.mp3");
const flipCard = new Audio("/src/sounds/flipcard.mp3");
const gameOff = new Audio("/src/sounds/gameoff.mp3");
const positiveA = new Audio("/src/sounds/positiveA.mp3");
const positiveB = new Audio("/src/sounds/positiveB.mp3");
const positiveC = new Audio("/src/sounds/positiveC.mp3");
const music = new Audio("/src/sounds/gameMusic.mp3");

// Obtengo cada carta y su valor
const barajaCopas: {
  [key: string]: { imagen: HTMLImageElement; valor: number };
} = {
  unoCopa: {
    imagen: document.getElementById("uno-copa") as HTMLImageElement,
    valor: 1,
  },
  dosCopa: {
    imagen: document.getElementById("dos-copa") as HTMLImageElement,
    valor: 2,
  },
  tresCopa: {
    imagen: document.getElementById("tres-copa") as HTMLImageElement,
    valor: 3,
  },
  cuatroCopa: {
    imagen: document.getElementById("cuatro-copa") as HTMLImageElement,
    valor: 4,
  },
  cincoCopa: {
    imagen: document.getElementById("cinco-copa") as HTMLImageElement,
    valor: 5,
  },
  seisCopa: {
    imagen: document.getElementById("seis-copa") as HTMLImageElement,
    valor: 6,
  },
  sieteCopa: {
    imagen: document.getElementById("siete-copa") as HTMLImageElement,
    valor: 7,
  },
  sotaCopa: {
    imagen: document.getElementById("sota-copa") as HTMLImageElement,
    valor: 0.5,
  },
  caballoCopa: {
    imagen: document.getElementById("caballo-copa") as HTMLImageElement,
    valor: 0.5,
  },
  reyCopa: {
    imagen: document.getElementById("rey-copa") as HTMLImageElement,
    valor: 0.5,
  },
};

// FUNCIONES
function muestraPuntuacion() {
  scoreDisplay.innerText = `Puntuación: ${playerScore.toString()}`;

  if (playerScore > 7.5) {
    gameOver();
  }
}

/* Esta función selecciona una carta al azar en el mazo (barajaCopas)
y muestra cuál carta es y su valor en la consola. Le pasa los parámetros a la
función que la sigue: muestraCarta */
function dameCarta() {
  // Obtengo todas las keys en barajaCopas
  const clavesBaraja = Object.keys(barajaCopas);
  // Obtengo un número aleatorio dentro del largo de las keys para usarlo como índice
  const indiceAleatorio = Math.floor(Math.random() * clavesBaraja.length);
  // Obtengo una key aleatoria usando como índice el aleatorio obtenido antes
  const claveAleatoria = clavesBaraja[indiceAleatorio];
  // Consigo y almaceno la carta aleatoria de la baraja
  const cartaAleatoria = barajaCopas[claveAleatoria];
  // Represento el valor por consola
  console.log(claveAleatoria);
  console.log(cartaAleatoria.valor);

  muestraCarta(cartaAleatoria, claveAleatoria);
}

// Interface creada para Typescript para permitir asignarle el tipo correcto en la función mostrarCarta
interface Carta {
  imagen: HTMLImageElement;
  valor: number;
}

/* muestraCarta coloca en el tablero de juego la carta conseguida
aleatoriamente mediante la función dameCarta(). 
Actualiza la puntuación y llama a la función que la sigue: eliminarCarta */
function muestraCarta(cartaAleatoria: Carta, claveAleatoria: string) {
  // Creo un nuevo nodo para la carta a mostrar y lo agrego al parent play-board(div)
  const showCard = document.createElement("img");
  showCard.src = cartaAleatoria.imagen.src;
  showCard.alt = cartaAleatoria.imagen.alt;
  showCard.classList.add("played-card");

  playBoard.appendChild(showCard);
  flipCard.play();

  // Actualizo la puntuación de la carta
  playerScore += cartaAleatoria.valor;
  muestraPuntuacion();

  // Llamo a la función para eliminar la carta
  eliminarCarta(cartaAleatoria, claveAleatoria);
}

/* eliminarCarta elimina la carta barajaCopa para que no se vuelva a repetir
y además la elimina del mazo borrando el elemento <img> correspondiente */
function eliminarCarta(cartaAleatoria: Carta, claveAleatoria: string) {
  // Ahora elimino la carta extraida para que no se repita
  delete barajaCopas[claveAleatoria];

  // Y la elimino también del mazo en el card-board
  const cartaExtraida = cardBoard.querySelector(
    `img[src="${cartaAleatoria.imagen.src}"]`
  );
  if (cartaExtraida) {
    cardBoard.removeChild(cartaExtraida);
  }
}

/* Shuffle es simplemente una animación que simular barajar las cartas */
function shuffle() {
  //Elimino la animación
  cardBoard.classList.remove("card-board");
  //Asi obligo al navegador a reiniciar la animación
  cardBoard.offsetWidth;
  cardBoard.classList.add("card-board");
  shuffling.play();
}

// Esta función termina el juego y deshabilita los botones
function gameOver() {
  gameOff.play();
  music.pause();
  shuffleButton.disabled = true;
  giveMeButton.disabled = true;
  plantarse.disabled = true;
  const gameOverDiv = document.getElementById("gameOver") as HTMLDivElement;
  gameOverDiv.classList.add("gameOverPanelOn");

  const newGameButton2 = document.getElementById(
    "newGame-button-B"
  ) as HTMLButtonElement;
  newGameButton2.addEventListener("click", newGame);
}

/* mePlanto sirve para terminar el juego donde te hayas quedado 
y además muestra algunas opciones */
function mePlanto() {
  // desactivo botones y música
  shuffleButton.disabled = true;
  giveMeButton.disabled = true;
  music.pause();
  // obtengo elementos
  const plantarseDiv = document.getElementById("mePlanto") as HTMLDivElement;
  plantarseDiv.classList.add("giveUpPanelOn");

  const texto = document.getElementById(
    "textoPlantarse"
  ) as HTMLParagraphElement;

  const newGameButton3 = document.getElementById(
    "newGame-button-C"
  ) as HTMLButtonElement;
  newGameButton3.addEventListener("click", newGame);

  // mensajes condicionados
  if (playerScore <= 4.5) {
    positiveC.play();
    texto.innerHTML = `Has sido muy conservador.<br>Te has plantado con ${playerScore} puntos.`;
  } else if (playerScore === 5 || playerScore === 5.5) {
    positiveC.play();
    texto.innerHTML = `Te ha entrado el canguelo, ¿eh?<br>Te has plantado con ${playerScore} puntos.`;
  } else if (playerScore >= 6 && playerScore <= 7) {
    positiveB.play();
    texto.innerHTML = `Casi casi...<br>Te has plantado con ${playerScore} puntos.`;
  } else if (playerScore === 7.5) {
    positiveA.play();
    texto.innerHTML = `¡Lo has clavado! ¡Enhorabuena!<br>Te has plantado con ${playerScore} puntos.`;
  }
}

function newGame() {
  location.reload();
}

function whatIf() {
  const clavesBaraja = Object.keys(barajaCopas);
  const indiceAleatorio = Math.floor(Math.random() * clavesBaraja.length);
  const claveAleatoria = clavesBaraja[indiceAleatorio];
  const cartaAleatoria = barajaCopas[claveAleatoria];

  const showCard = document.createElement("img");
  showCard.src = cartaAleatoria.imagen.src;
  showCard.alt = cartaAleatoria.imagen.alt;
  showCard.classList.add("whatIfCard");

  const whatIfText = document.createElement("p");
  whatIfText.classList.add("whatIfText");
  whatIfText.innerHTML = `Pues que hubieses sacado un: `;

  gameOverPanel.appendChild(whatIfText);
  gameOverPanel.appendChild(showCard);
  eliminarCarta(cartaAleatoria, claveAleatoria);

  whatIfButton.disabled = true;
  flipCard.play();
}

function playMusic() {
  if (music.paused) {
    music.play();
    music.volume = 1;
    music.loop = true;
  } else {
    music.pause();
  }
}

// Carga la puntuación en cuanto ha cargado el DOM.
document.addEventListener("DOMContentLoaded", muestraPuntuacion);
shuffleButton.addEventListener("click", shuffle);
giveMeButton.addEventListener("click", dameCarta);
plantarse.addEventListener("click", mePlanto);
newGameButton.addEventListener("click", newGame);
whatIfButton.addEventListener("click", whatIf);
musicIcon.addEventListener("click", playMusic);
playMusic();
