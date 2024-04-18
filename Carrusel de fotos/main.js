import "./style.css";

function cambiarImagen(idMiniatura) {
  const principal = document.getElementById("principal");
  const miniatura = document.getElementById(idMiniatura);
  principal.src = miniatura.src;
  principal.alt = miniatura.alt;
}

const imagen1 = document.getElementById("imagen1");
const imagen2 = document.getElementById("imagen2");
const imagen3 = document.getElementById("imagen3");
const imagen4 = document.getElementById("imagen4");

imagen1.addEventListener("click", () => cambiarImagen("imagen1"));
imagen2.addEventListener("click", () => cambiarImagen("imagen2"));
imagen3.addEventListener("click", () => cambiarImagen("imagen3"));
imagen4.addEventListener("click", () => cambiarImagen("imagen4"));
