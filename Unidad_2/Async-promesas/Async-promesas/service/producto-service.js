
const listaProductos = () => 
    fetch("http://localhost:3000/productos").then(respuesta => respuesta.json());

const crearProducto = (nombre, precio, descripcion) => {
    return fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio, descripcion, id: uuid.v4() })
    });
};

const eliminarProducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE"
    });
};

const detalleProducto = (id) => 
    fetch(`http://localhost:3000/productos/${id}`).then(respuesta => respuesta.json());

const actualizarProducto = (nombre, precio, descripcion, id) => {
    return fetch(`http://localhost:3000/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio, descripcion })
    });
};

export const productoService = {
    listaProductos,
    crearProducto,
    eliminarProducto,
    detalleProducto,
    actualizarProducto,
};