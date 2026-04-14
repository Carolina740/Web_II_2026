import { petService } from "../service/pet-service.js";

const formulario = document.querySelector('[data-form-pet]');

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const edad = document.querySelector("[data-edad]").value;
    const raza = document.querySelector("[data-raza]").value;
    const peso = document.querySelector("[data-peso]").value;
    const dueñoId = document.querySelector("[data-dueño-id]").value;

    petService.crearMascota(nombre, edad, raza, peso, dueñoId)
        .then(() => {
            window.location.href = "./registro_completado.html";
        })
        .catch((err) => console.log(err));
});