import { clientService } from "../service/client_service.js";

const crearFila = (nombre, email, id) => {
    const fila = document.createElement('tr');
    const contenido = `
        <td class="td">${escapeHtml(nombre)}</td>
        <td class="td">${escapeHtml(email)}</td>
        <td class="td">
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_cliente.html?id=${id}" class="simple-button simple-button--edit">
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
        if (confirm("¿Estás seguro de eliminar este cliente?")) {
            try {
                await clientService.eliminarCliente(id);
                fila.remove();
                alert("Cliente eliminado");
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

const table = document.querySelector("[data-table]");

clientService.listar_clientes()
    .then((data) => {
        data.forEach(({ nombre, email, id }) => {
            const nuevaFila = crearFila(nombre, email, id);
            table.appendChild(nuevaFila);
        });
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Error al cargar clientes");
    });