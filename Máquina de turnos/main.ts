import "./style.css";

const flechaIzq = document.getElementById("flechaIzq") as HTMLImageElement;
const flechaDer = document.getElementById("flechaDer") as HTMLImageElement;
const numeroTurno = document.getElementById(
  "numero-turno"
) as HTMLHeadingElement;
const reset = document.getElementById("reset-button") as HTMLButtonElement;
const inputTurnos = document.getElementById("input-turnos") as HTMLInputElement;
const textoTurnos = document.getElementById(
  "texto-turno"
) as HTMLParagraphElement;

let turno = 1;

function cambiarTurno(cambiar: string) {
  if (cambiar === "flechaDer" && turno < 99) {
    turno++;
    numeroTurno.innerText = turno.toString().padStart(2, "0");
    textoTurnos.innerText = "Por favor, acérquese al mostrador";
  } else if (cambiar === "flechaIzq" && turno > 1) {
    turno--;
    numeroTurno.innerText = turno.toString().padStart(2, "0");
    textoTurnos.innerText = "Por favor, acérquese al mostrador";
  } else if (cambiar === "reset") {
    turno = 1;
    numeroTurno.innerText = turno.toString().padStart(2, "0");
    textoTurnos.innerText = "Por favor, acérquese al mostrador";
  } else if (cambiar === "input") {
    turno = parseInt(inputTurnos.value);
    if (turno > 99 || turno < 1) {
      numeroTurno.innerText = "¡Error!";
      textoTurnos.innerText = "Fuera de rango: Entre 1 y 99";
    } else {
      numeroTurno.innerText = inputTurnos.value.padStart(2, "0");
      textoTurnos.innerText = "Por favor, acérquese al mostrador";
    }
  }
}

flechaDer.addEventListener("click", () => cambiarTurno("flechaDer"));
flechaIzq.addEventListener("click", () => cambiarTurno("flechaIzq"));
reset.addEventListener("click", () => cambiarTurno("reset"));
inputTurnos.addEventListener("keydown", () => cambiarTurno("input"));
