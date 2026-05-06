import { productoService } from "../service/product_service.js";

const crearFila = (id, nombre, precio) => {
    const fila = document.createElement("tr");
    const contenido = `
        <td class="td">${id}</td>
        <td class="td">${escapeHtml(nombre)}</td>
        <td class="td">Bs. ${precio}</td>
        <td class="td">
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_produc.html?id=${id}" class="simple-button simple-button--edit">
                        Editar
                    </a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" type="button" data-id="${id}">
                        Eliminar
                    </button>
                </li>
            </ul>
        </td>
    `;
    fila.innerHTML = contenido;
    
    const btnEliminar = fila.querySelector("button");
    btnEliminar.addEventListener("click", async () => {
        if (confirm("¿Estás seguro de eliminar este producto?")) {
            try {
                await productoService.eliminarProducto(id);
                fila.remove();
                alert("Producto eliminado");
            } catch (error) {
                console.error("Error:", error);
                alert("Error al eliminar");
            }
        }
    });
    
    return fila;
};

const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

const tableProd = document.querySelector("[data-table-products]");

productoService.listaProductos()
    .then((data) => {
        data.forEach(({ id, nombre, precio }) => {
            const fila = crearFila(id, nombre, precio);
            tableProd.appendChild(fila);
        });
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Error al cargar productos");
    });