import { petService } from "../service/pets_service.js";

const crearFilaMascota = async (nombre, raza, edad, peso, dueñoId, id) => {
    const fila = document.createElement('tr');
    
    let informacionDueño = "Cargando...";
    try {
        const dueño = await petService.obtenerDueño(dueñoId);
        informacionDueño = dueño ? `${dueño.nombre}` : "No encontrado";
    } catch (error) {
        informacionDueño = "Error";
    }

    const contenido = `
        <td class="td">${escapeHtml(nombre)}</td>
        <td class="td">${edad}</td>
        <td class="td">${escapeHtml(raza)}</td>
        <td class="td">${peso} kg</td>
        <td class="td">${escapeHtml(informacionDueño)}</td>
        <td class="td">
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_pets.html?id=${id}" class="simple-button simple-button--edit">
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
        if (confirm("¿Estás seguro de eliminar esta mascota?")) {
            try {
                await petService.eliminarMascota(id);
                fila.remove();
                alert("Mascota eliminada");
            } catch (error) {
                console.error("Error:", error);
                alert("Error al eliminar");
            }
        }
    });
    
    return fila;
};

const escapeHtml = (text) => {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

const cargarMascotas = async () => {
    const table = document.querySelector("[data-table-pets]");
    if (!table) return;

    try {
        const mascotas = await petService.listaMascotas();
        table.innerHTML = '';
        
        for (const mascota of mascotas) {
            const fila = await crearFilaMascota(
                mascota.nombre, 
                mascota.raza, 
                mascota.edad, 
                mascota.peso, 
                mascota.duenoId || mascota.dueñoId,  // compatibilidad con ambos nombres
                mascota.id
            );
            table.appendChild(fila);
        }
    } catch (error) {
        console.error("Error:", error);
        table.innerHTML = '<tr><td colspan="6">Error al cargar mascotas</td></tr>';
    }
};

cargarMascotas();