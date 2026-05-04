import { v4 as uuid } from 'https://cdn.skypack.dev/uuid';
import { SUPABASE_URL, headers } from './supabase-config.js';

const PRODUCTS_URL = `${SUPABASE_URL}/products`;
const CLIENTS_URL = `${SUPABASE_URL}/clients`;

const generateId = () => uuid();

const listaProductos = () => {
  return fetch(PRODUCTS_URL, { headers }).then(response => {
    if (!response.ok) throw new Error('error productos');
    return response.json();
  });
};

const listarClientes = () => {
  return fetch(CLIENTS_URL, { headers }).then(response => {
    if (!response.ok) throw new Error('error clientes');
    return response.json();
  });
};

const crearProducto = (nombre, precio, descripcion) => {
  const id = generateId();
  const payload = [{ id, nombre, precio, descripcion }];
  return fetch(PRODUCTS_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }).then(response => {
    if (!response.ok) throw new Error('error productos');
    return response.json().then(data => ({ success: true, data: data[0] }));
  });
};

const eliminarProducto = (id) => {
  return fetch(`${PRODUCTS_URL}?id=eq.${id}`, {
    method: 'DELETE',
    headers
  }).then(response => {
    if (!response.ok) throw new Error('error eliminar');
    return { success: true };
  });
};

const detalleProducto = (id) => {
  return fetch(`${PRODUCTS_URL}?id=eq.${id}`, { headers }).then(response => response.json().then(data => data[0]));
};

const actualizarProducto = (nombre, precio, descripcion, id) => {
  const payload = { nombre, precio, descripcion };
  return fetch(`${PRODUCTS_URL}?id=eq.${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(payload)
  }).then(response => {
    if (!response.ok) throw new Error('Error updating product');
    return response.json().then(data => ({ success: true, data: data[0] }));
  }).catch(err => console.log(err));
};

export const productoService = {
  listaProductos,
  listarClientes,
  crearProducto,
  eliminarProducto,
  detalleProducto,
  actualizarProducto
};
