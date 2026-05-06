import { petService } from "../service/pets_service.js";
import { clientService } from "../service/client_service.js";

const formulario = document.querySelector('[data-form-pet]');
const selectDueno = document.querySelector('[data-dueno-id]');

if (!formulario) {
    console.error("Formulario no encontrado");
}

// Cargar clientes en el select al iniciar
const cargarClientes = async () => {
    try {
        const clientes = await clientService.listar_clientes();
        selectDueno.innerHTML = '<option value="">-- Selecciona un dueño --</option>';
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nombre} (${cliente.email})`;
            selectDueno.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar clientes:", error);
        selectDueno.innerHTML = '<option value="">Error al cargar clientes</option>';
    }
};

cargarClientes();

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    
    const nombre = document.querySelector("[data-nombre]").value.trim();
    const raza = document.querySelector("[data-raza]").value.trim();
    const edad = document.querySelector("[data-edad]").value;
    const peso = document.querySelector("[data-peso]").value;
    const duenoId = document.querySelector("[data-dueno-id]").value.trim();
    
    console.log("Datos a enviar:", { nombre, raza, edad, peso, duenoId });
    
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
        const resultado = await petService.crearMascota(nombre, raza, edad, peso, duenoId);
        console.log("Resultado:", resultado);
        
        if (resultado.error) {
            alert("Error: " + resultado.error);
        } else {
            window.location.href = "./registro_completado_mascota.html";
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al registrar mascota: " + error.message);
    }
});
