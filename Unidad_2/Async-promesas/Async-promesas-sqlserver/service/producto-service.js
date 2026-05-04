import { v4 as uuid } from 'https://cdn.skypack.dev/uuid';

const API_BASE_URL = 'http://localhost:3000/api/productos';
const API_CLIENTES_URL = 'http://localhost/api/clientes.php';

const listaProductos = () => {
    return fetch(API_BASE_URL).then(response => {
        if(!response.ok) throw new Error('error productos');
        return response.json();
    })
};

const listarClientes = () => {
    return fetch(API_CLIENTES_URL).then(response => {
        if(!response.ok) throw new Error('error clientes');
        return response.json();
    })
};

const crearProducto = (nombre, precio, descripcion) => {
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio, descripcion, id: 'p' + Date.now() })
    }).then(response => {
        if(!response.ok) throw new Error('error productos');
        return response.json();
    })
};

const eliminarProducto = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: "DELETE"
    });
};

const detalleProducto = (id) => 
    fetch(`${API_BASE_URL}?id=${id}`).then(respuesta => respuesta.json());

const actualizarProducto = (nombre, precio, descripcion, id) => {
    return fetch(API_BASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio, descripcion, id })
    }).then(respuesta => {
        if (!respuesta.ok) throw new Error('Error updating product');
        return respuesta;
    }).catch((err) => {
        console.error(err);
        throw err;
    });
};

export const productoService = {
    listaProductos,
    listarClientes,
    crearProducto,
    eliminarProducto,
    detalleProducto,
    actualizarProducto,
};
