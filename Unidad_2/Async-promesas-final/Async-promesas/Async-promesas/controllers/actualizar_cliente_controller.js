import { clientService } from "../service/client_service.js";

const formulario = document.querySelector('[data-form]');

const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    
    if (!id) {
        window.location.href = "./error.html";
        return;
    }

    const nombreInput = document.querySelector("[data-nombre]");
    const emailInput = document.querySelector("[data-email]");

    try {
        const perfil = await clientService.detalleCliente(id);
        if (perfil.nombre && perfil.email) {
            nombreInput.value = perfil.nombre;
            emailInput.value = perfil.email;
        } else {
            throw new Error("Datos incompletos");
        }
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
    const email = document.querySelector("[data-email]").value.trim();

    if (!nombre || !email) {
        alert("Por favor, completa todos los campos");
        return;
    }

    if (!email.includes('@')) {
        alert("Email inválido");
        return;
    }

    try {
        await clientService.actualizarCliente(nombre, email, id);
        window.location.href = "./edicion_concluida_cliente.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Error al actualizar");
    }
});

obtenerInformacion();