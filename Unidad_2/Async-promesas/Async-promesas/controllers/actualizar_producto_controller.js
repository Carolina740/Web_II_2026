import { productoService } from "../service/producto-service.js";

const formulario = document.querySelector('[data-form]');

const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id === null) {
        window.location.href = "./error.html";
    }

    const nombre = document.querySelector("[data-nombre]");
    const precio = document.querySelector("[data-precio]");
    const descripcion = document.querySelector("[data-descripcion]");

    try {
        const producto = await productoService.detalleProducto(id);
        nombre.value = producto.nombre;
        precio.value = producto.precio;
        descripcion.value = producto.descripcion;
    } catch (error) {
        window.location.href = "./error.html";
    }
};

obtenerInformacion();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;

    productoService.actualizarProducto(nombre, precio, descripcion, id).then(() => {
        window.location.href = "./edicion_concluida.html";
    });
});