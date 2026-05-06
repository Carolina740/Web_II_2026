import { productoService } from "../service/product_service.js";
import { clientService } from "../service/client_service.js";

const formulario = document.querySelector('[data-form-product]');
const selectCliente = document.querySelector('[data-id-cliente]');

// Cargar clientes en el select al iniciar
const cargarClientes = async () => {
    try {
        const clientes = await clientService.listar_clientes();
        selectCliente.innerHTML = '<option value="">-- Sin cliente asignado --</option>';
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nombre} (${cliente.email})`;
            selectCliente.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar clientes:", error);
        selectCliente.innerHTML = '<option value="">Error al cargar clientes</option>';
    }
};

cargarClientes();

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    
    const nombre = document.querySelector("[data-nombre]").value.trim();
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value.trim();
    const idCliente = document.querySelector("[data-id-cliente]").value || null;

    if (!nombre || !precio) {
        alert("Por favor, completa los campos obligatorios");
        return;
    }

    if (isNaN(precio) || precio <= 0) {
        alert("Precio inválido");
        return;
    }

    try {
        await productoService.crearProducto(nombre, precio, descripcion, idCliente);
        window.location.href = "./registro_completado_producto.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Error al registrar producto");
    }
});
