import { clientService } from "../service/client_service.js";

const formulario = document.querySelector('[data-form]');

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    
    const nombre = document.querySelector("[data-nombre]").value.trim();
    const email = document.querySelector("[data-email]").value.trim();

    if (!nombre || !email) {
        alert("Por favor, completa todos los campos");
        return;
    }

    if (nombre.length < 2) {
        alert("El nombre debe tener al menos 2 caracteres");
        return;
    }

    if (!email.includes('@')) {
        alert("Email inválido");
        return;
    }

    try {
        await clientService.crearCliente(nombre, email);
        window.location.href = "./registro_completado_cliente.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Error al registrar");
    }
});