const API_BASE_URL = 'http://localhost/api/clientes.php';

// Import uuid for better unique IDs
import { v4 as uuid } from 'https://cdn.skypack.dev/uuid';

const generateId = () => {
    return uuid();
};


const listar_clientes = () => {
    return fetch(API_BASE_URL).then(response => {
        if(!response.ok) throw new Error('error clientes');
        return response.json();
    })
};

const crearCliente = (nombre, email) => {
    const id = generateId();
    const payload = { nombre, email, id };
    
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if(!response.ok) throw new Error('error clientes: ' + response.status);
        return response.json();
    })
};

const eliminarCliente = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: "DELETE"
    });
};

const detalleCliente = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`).then((respuesta) => respuesta.json());
};

const actualizarCliente = (nombre, email, id) => {
    return fetch(API_BASE_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email, id })
    }).then(respuesta => {
        if (!respuesta.ok) throw new Error('Error updating client');
        return respuesta;
    }).catch((err) => {
        console.error(err);
        throw err;
    });
};

export const clientService = {
    listar_clientes,
    crearCliente,
    eliminarCliente,
    detalleCliente,
    actualizarCliente,
};

