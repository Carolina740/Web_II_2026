import { petService } from "../service/pet-service.js";

const formulario = document.querySelector('[data-form]');

const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id === null) {
        window.location.href = "./error.html";
    }

    const nombre = document.querySelector("[data-nombre]");
    const edad = document.querySelector("[data-edad]");
    const raza = document.querySelector("[data-raza]");
    const peso = document.querySelector("[data-peso]");
    const dueñoId = document.querySelector("[data-dueño-id]");

    try {
        const mascota = await petService.detalleMascota(id);
        nombre.value = mascota.nombre;
        edad.value = mascota.edad;
        raza.value = mascota.raza;
        peso.value = mascota.peso;
        dueñoId.value = mascota.dueñoId;
    } catch (error) {
        window.location.href = "./error.html";
    }
};

obtenerInformacion();

document.addEventListener('DOMContentLoaded', () => {
    obtenerInformacion();
    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();
        const url = new URL(window.location);
        const id = url.searchParams.get("id");

        const nombre = document.querySelector("[data-nombre]").value;
        const edad = document.querySelector("[data-edad]").value;
        const raza = document.querySelector("[data-raza]").value;
        const peso = document.querySelector("[data-peso]").value;
        const dueñoId = document.querySelector("[data-dueño-id]").value;

        try {
            await petService.actualizarMascota(nombre, edad, raza, peso, id, dueñoId);
            window.location.href = "./edicion_concluida.html";
        } catch (error) {
            console.error('Update pet failed:', error);
            alert('Error al actualizar la mascota: ' + error.message);
        }
    });
});
