import { petService } from "../service/pet-service.js";

const formulario = document.querySelector('[data-form-pet]');
const selectDueño = document.querySelector('[data-dueño-id]');

// Cargar clientes al abrir la página
document.addEventListener('DOMContentLoaded', () => {
    petService.listarClientes().then((clientes) => {
        clientes.forEach((cliente) => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nombre} (ID: ${cliente.id})`;
            selectDueño.appendChild(option);
        });
    }).catch((err) => {
        console.log('Error al cargar clientes:', err);
        alert('No se pudo cargar la lista de clientes');
    });
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const edad = document.querySelector("[data-edad]").value;
    const raza = document.querySelector("[data-raza]").value;
    const peso = document.querySelector("[data-peso]").value;
    const duenoId = selectDueño.value;

    if (!duenoId) {
        alert('Por favor selecciona un cliente');
        return;
    }

    petService.crearMascota(nombre, edad, raza, peso, duenoId)
        .then(() => {
            window.location.href = "./registro_completado.html";
        })
        .catch((err) => {
            alert('Error al guardar mascota: ' + err.message);
            console.log(err);
        });
});