import { v4 as uuid } from 'https://cdn.skypack.dev/uuid';

const API_BASE_URL = 'http://localhost/api/productos_fixed.php';

const listaProductos = () => {
    return fetch(API_BASE_URL).then(response => {
        if(!response.ok) throw new Error('error productos');
        return response.json();
    })
};

const crearProducto = (nombre, precio, descripcion) => {
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio, descripcion, id: uuid() })
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
    }).then(respuesta => respuesta).catch((err) => console.log(err));
};

export const productoService = {
    listaProductos,
    crearProducto,
    eliminarProducto,
    detalleProducto,
    actualizarProducto,
};
