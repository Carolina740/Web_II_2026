import { productoService } from "../service/producto-service.js";

const crearFila = (id, nombre, descripcion, precio) => {
    const fila = document.createElement("tr");
    const contenido = `
        <td class="td" data-td>${id}</td>
        <td>${nombre}</td>
        <td>${descripcion}</td>
        <td>bs.${precio}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a
                        href="../screens/editar_producto.html?id=${id}"
                        class="simple-button simple-button--edit"
                    >
                    Editar
                    </a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" type="button" id="${id}">
                    Eliminar
                    </button>
                </li>
            </ul>
        </td>
    `;
    fila.innerHTML = contenido;
    
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        const idProducto = btn.id;
        productoService.eliminarProducto(idProducto).then(respuesta => {
            alert("Producto eliminado");
            window.location.reload();
        }).catch(error => alert("Error al eliminar"));
    });
    
    return fila;
};

const tableProd = document.querySelector("[data-table-products]");
productoService.listaProductos().then((data) => {
    data.forEach(({ id, nombre, descripcion, precio }) => {
        const fila = crearFila(id, nombre, descripcion, precio);
        tableProd.appendChild(fila);
    });
});