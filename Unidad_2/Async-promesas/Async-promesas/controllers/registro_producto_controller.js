import { productoService } from "../service/producto-service.js";

const formulario = document.querySelector('[data-form-product]');

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;

    productoService.crearProducto(nombre, precio, descripcion)
        .then(() => {
            console.log("Producto guardado con éxito");
            window.location.href = "./registro_completado.html";
        })
        .catch((err) => {
            alert("Hubo un error al guardar. Revisa la consola.");
            console.log(err);
        });
});