import { petService } from "../service/pet-service.js";

const crearFilaMascota = async (nombre, edad, raza, peso, dueñoId, id) => {
    const fila = document.createElement('tr');
    
    let informacionDueño = "Cargando...";
    try {
        const dueño = await petService.obtenerDueño(dueñoId);
        informacionDueño = `${dueño.nombre} (${dueño.email})`;
    } catch (evento) {
        informacionDueño = "No encontrado";
    }

    const contenido = `
        <td class="td">${nombre}</td>
        <td>${edad}</td>
        <td>${raza}</td>
        <td>${peso}</td>
        <td>${informacionDueño}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a
                        href="../screens/editar_pet.html?id=${id}"
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
        const idMascota = btn.id;
        petService.eliminarMascota(idMascota).then(respuesta => {
            alert("Mascota eliminada");
            window.location.reload();
        }).catch(error => alert("Error al eliminar"));
    });
    
    return fila;
}

const table = document.querySelector("[data-table-pets]");
petService.listaMascotas().then((data) => {
    data.forEach(async (pet) => {
        const nuevaFila = await crearFilaMascota(pet.nombre, pet.edad, pet.raza, pet.peso, pet.dueñoId, pet.id);
        table.appendChild(nuevaFila);
    });
});