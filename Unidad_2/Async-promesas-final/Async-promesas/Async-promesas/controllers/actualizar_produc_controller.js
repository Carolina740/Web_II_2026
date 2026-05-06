import { productoService } from "../service/product_service.js";
import { clientService } from "../service/client_service.js";

const formulario = document.querySelector('[data-form]');
const selectCliente = document.querySelector('[data-id-cliente]');

// Cargar datos del producto y clientes disponibles
const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (!id) {
        window.location.href = "./error.html";
        return;
    }

    try {
        // Cargar producto y clientes en paralelo
        const [producto, clientes] = await Promise.all([
            productoService.detalleProducto(id),
            clientService.listar_clientes()
        ]);

        // Poblar select de clientes
        selectCliente.innerHTML = '<option value="">-- Sin cliente asignado --</option>';
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nombre} (${cliente.email})`;
            if (cliente.id === producto.idCliente) option.selected = true;
            selectCliente.appendChild(option);
        });

        // Rellenar campos
        document.querySelector("[data-nombre]").value = producto.nombre;
        document.querySelector("[data-precio]").value = producto.precio;
        document.querySelector("[data-descripcion]").value = producto.descripcion || '';

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
        await productoService.actualizarProducto(nombre, precio, id, descripcion, idCliente);
        window.location.href = "./edicion_concluida_producto.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Error al actualizar");
    }
});

obtenerInformacion();
