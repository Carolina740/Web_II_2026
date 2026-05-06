import { petService } from "../service/pets_service.js";
import { clientService } from "../service/client_service.js";

const formulario = document.querySelector('[data-form]');
const selectDueno = document.querySelector('[data-dueno-id]');

// Cargar clientes en el select y preseleccionar el actual
const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (!id) {
        window.location.href = "./error.html";
        return;
    }

    try {
        // Cargar mascota y clientes en paralelo
        const [mascota, clientes] = await Promise.all([
            petService.detalleMascota(id),
            clientService.listar_clientes()
        ]);

        // Poblar select de dueños
        const duenoActual = mascota.duenoId || mascota.dueñoId;
        selectDueno.innerHTML = '<option value="">-- Selecciona un dueño --</option>';
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nombre} (${cliente.email})`;
            if (cliente.id === duenoActual) option.selected = true;
            selectDueno.appendChild(option);
        });

        // Rellenar campos
        document.querySelector("[data-nombre]").value = mascota.nombre;
        document.querySelector("[data-raza]").value = mascota.raza;
        document.querySelector("[data-edad]").value = mascota.edad;
        document.querySelector("[data-peso]").value = mascota.peso;

    } catch (error) {
        console.error("Error:", error);
        window.location.href = "./error.html";
    }
};

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector("[data-nombre]").value.trim();
    const raza = document.querySelector("[data-raza]").value.trim();
    const edad = document.querySelector("[data-edad]").value;
    const peso = document.querySelector("[data-peso]").value;
    const duenoId = document.querySelector("[data-dueno-id]").value.trim();

    if (!nombre || !raza || !edad || !peso || !duenoId) {
        alert("Por favor, completa todos los campos");
        return;
    }

    if (edad <= 0) {
        alert("Edad inválida");
        return;
    }

    if (peso <= 0) {
        alert("Peso inválido");
        return;
    }

    try {
        await petService.actualizarMascota(nombre, raza, edad, peso, duenoId, id);
        window.location.href = "./edicion_concluida_mascota.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Error al actualizar");
    }
});

obtenerInformacion();
