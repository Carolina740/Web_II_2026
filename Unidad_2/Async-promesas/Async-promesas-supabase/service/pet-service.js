import { v4 as uuid } from 'https://cdn.skypack.dev/uuid';
import { SUPABASE_URL, headers } from './supabase-config.js';

const PETS_URL = `${SUPABASE_URL}/pets`;

const CLIENTS_URL = `${SUPABASE_URL}/clients`;


const generateId = () => uuid();

const listaMascotas = () => {
  return fetch(PETS_URL, { headers }).then(response => {
    if (!response.ok) throw new Error('error mascotas');
    return response.json();
  });
};

const listarClientes = () => {
  return fetch(CLIENTS_URL, { headers }).then(response => {
    if (!response.ok) throw new Error('error clientes');
    return response.json();
  });
};

const crearMascota = (nombre, edad, raza, peso, duenoId) => {
  const id = generateId();
  const payload = [{ id, nombre, edad, raza, peso, owner_id: duenoId }];
  return fetch(PETS_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }).then(response => {
    if (!response.ok) throw new Error('error mascotas');
    return response.json().then(data => ({ success: true, data: data[0] }));
  }).catch(err => {
    console.error('Pet create error:', err);
    throw err;
  });
};

const eliminarMascota = (id) => {
  return fetch(`${PETS_URL}?id=eq.${id}`, {
    method: 'DELETE',
    headers
  }).then(response => {
    if (!response.ok) throw new Error('error eliminar');
    return { success: true };
  });
};

const detalleMascota = (id) => {
  return fetch(`${PETS_URL}?id=eq.${id}`, { headers }).then(response => response.json().then(data => data[0]));
};

const actualizarMascota = (nombre, edad, raza, peso, id, duenoId) => {
  const payload = { nombre, edad, raza, peso };
  if (duenoId) payload.owner_id = duenoId;
  return fetch(`${PETS_URL}?id=eq.${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(payload)
  }).then(response => {
    if (!response.ok) throw new Error('Error updating pet');
    return response.json().then(data => ({ success: true, data: data[0] }));
  }).catch(err => {
    console.error(err);
    throw err;
  });
};

const obtenerDueño = (idDueño) => {
  return fetch(`${CLIENTS_URL}?id=eq.${idDueño}`, { headers }).then(response => response.json().then(data => data[0]));
};

export const petService = {
  listaMascotas,
  listarClientes,
  crearMascota,
  eliminarMascota,
  detalleMascota,
  actualizarMascota,
  obtenerDueño
};
