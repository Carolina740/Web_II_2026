import { clientService } from "../service/client-service.js";

const formulario = document.querySelector('[data-form]');

// Inicializar BD cuando carga la página
// Removed init_db.php call — no more DB wipes!


formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    
    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;
    
    if (!nombre || !email) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    console.log('Registrando cliente:', { nombre, email });
    
    try {
        const respuesta = await clientService.crearCliente(nombre, email);
        console.log("Cliente guardado:", respuesta);
        
        alert('¡Cliente registrado exitosamente!');
        formulario.reset();
        window.location.href = "./registro_completado.html";
    } catch (error) {
        console.error('Error al guardar cliente:', error);
        alert('Error al guardar cliente: ' + error.message);
    }
});