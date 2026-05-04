import { v4 as uuid } from 'https://cdn.skypack.dev/uuid';
import { SUPABASE_URL, headers } from './supabase-config.js';

const CLIENTS_URL = `${SUPABASE_URL}/clients`;

const generateId = () => uuid();

const listar_clientes = () => {
  return fetch(CLIENTS_URL, { headers }).then(response => {
    if (!response.ok) throw new Error('error clientes: ' + response.status);
    return response.json();
  });
};

const crearCliente = (nombre, email) => {
  const id = generateId();
  const payload = [{ id, nombre, email }];
  return fetch(CLIENTS_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }).then(response => {
    if (!response.ok) throw new Error('error clientes: ' + response.status);
    return response.json().then(data => ({ success: true, data: data[0] }));
  });
};

const eliminarCliente = (id) => {
  return fetch(`${CLIENTS_URL}?id=eq.${id}`, {
    method: 'DELETE',
    headers
  }).then(response => {
    if (!response.ok) throw new Error('error eliminar');
    return { success: true };
  });
};

const detalleCliente = (id) => {
  return fetch(`${CLIENTS_URL}?id=eq.${id}`, { headers }).then(response => response.json().then(data => data[0]));
};

const actualizarCliente = (nombre, email, id) => {
  const payload = { nombre, email };
  return fetch(`${CLIENTS_URL}?id=eq.${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(payload)
  }).then(response => {
    if (!response.ok) throw new Error('Error updating client');
    return response.json().then(data => ({ success: true, data: data[0] }));
  });
};

export const clientService = {
  listar_clientes,
  crearCliente,
  eliminarCliente,
  detalleCliente,
  actualizarCliente
};
