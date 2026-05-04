import { productoService } from "../service/producto-service.js";

const formulario = document.querySelector('[data-form-product]');
const selectCliente = document.querySelector('[data-id-cliente]');

// Cargar clientes al abrir la página
document.addEventListener('DOMContentLoaded', () => {
    productoService.listarClientes().then((clientes) => {
        clientes.forEach((cliente) => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nombre} (ID: ${cliente.id})`;
            selectCliente.appendChild(option);
        });
    }).catch((err) => {
        console.log('Error al cargar clientes:', err);
        alert('No se pudo cargar la lista de clientes');
    });
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;
    const idCliente = selectCliente.value;

    if (!idCliente) {
        alert('Por favor selecciona un cliente');
        return;
    }

    productoService.crearProducto(nombre, precio, descripcion, idCliente)
        .then(() => {
            console.log("Producto guardado con éxito");
            window.location.href = "./registro_completado.html";
        })
        .catch((err) => {
            alert('Error al guardar producto: ' + err.message);
            console.log(err);
        });
});