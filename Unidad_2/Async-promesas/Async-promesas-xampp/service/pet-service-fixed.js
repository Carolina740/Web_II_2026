import { v4 as uuid } from 'https://cdn.skypack.dev/uuid';

const API_BASE_URL = 'http://localhost/api/mascotas_fixed.php';
const API_CLIENTES_URL = 'http://localhost/api/clientes.php';

const listaMascotas = () => {
    return fetch(API_BASE_URL).then(response => {
        if(!response.ok) throw new Error('error mascotas');
        return response.json();
    })
};

const listarClientes = () => {
    return fetch(API_CLIENTES_URL).then(response => {
        if(!response.ok) throw new Error('error clientes');
        return response.json();
    })
};

const crearMascota = (nombre, edad, raza, peso, duenoId) => {
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad, raza, peso, duenoId, id: uuid() })  // Better UUID
    }).then(response => {
        if(!response.ok) throw new Error('error mascotas');
        return response.json();
    }).catch(err => {
        console.error('Pet create error:', err);
        throw err;
    })
};

const eliminarMascota = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: "DELETE"
    });
};

const detalleMascota = (id) => 
    fetch(`${API_BASE_URL}?id=${id}`).then(respuesta => respuesta.json());

const actualizarMascota = (nombre, edad, raza, peso, id, duenoId) => {
    const payload = { nombre, edad, raza, peso, id };
    if (duenoId) payload.duenoId = duenoId;
    return fetch(API_BASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(respuesta => {
        if (!respuesta.ok) throw new Error('Error updating pet');
        return respuesta;
    }).catch((err) => {
        console.error(err);
        throw err;
    });
};

const obtenerDueño = (idDueño) => 
    fetch(`${API_CLIENTES_URL}?id=${idDueño}`).then(respuesta => respuesta.json());

export const petService = {
    listaMascotas,
    listarClientes,
    crearMascota,
    eliminarMascota,
    detalleMascota,
    actualizarMascota,
    obtenerDueño
};

