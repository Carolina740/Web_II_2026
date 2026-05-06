/*const API_URL = "http://localhost:3000/perfil";

const listar_clientes = () => 
    fetch(API_URL).then(respuesta => respuesta.json());

const crearCliente = (nombre, email) => {
    const id = uuid.v4();
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, id })
    });
};

const eliminarCliente = (id) => {
    return fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

const detalleCliente = (id) => {
    return fetch(`${API_URL}/${id}`).then(respuesta => respuesta.json());
};

const actualizarCliente = (nombre, email, id) => {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, id })
    });
};
*/

/**/


/*
//-----CON XAMPP (PHP API)-----//
const API_URL = "http://127.0.0.1/doguito_petshop/api/conexion.php";

const listar_clientes = () => 
    fetch(API_URL)
        .then(respuesta => respuesta.json());

const crearCliente = (nombre, email) => {
    const id = uuid.v4();
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, id })
    });
};

const eliminarCliente = (id) => {
    return fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
};

const detalleCliente = (id) => {
    return fetch(`${API_URL}?id=${id}`).then(respuesta => respuesta.json());
};

const actualizarCliente = (nombre, email, id) => {
    return fetch(`${API_URL}?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, id })
    });
};

export const clientService = {
    listar_clientes,
    crearCliente,
    eliminarCliente,
    detalleCliente,
    actualizarCliente
};
*/

// Supabase
/*
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const SUPABASE_URL = "https://uqduducofrhycmruurai.supabase.co";
const SUPABASE_KEY = "sb_publishable_8go3I9fTQGMN-A08cEiSgg_dC5rhvgA";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const listar_clientes = async () => {
    const { data, error } = await supabase.from('clientes').select('*').order('nombre', { ascending: true });
    if (error) throw error;
    return data;
};

const crearCliente = async (nombre, email) => {
    const id = crypto.randomUUID();
    const { data, error } = await supabase.from('clientes').insert([{ id, nombre, email }]).select();
    if (error) throw error;
    return data[0];
};

const eliminarCliente = async (id) => {
    const { error } = await supabase.from('clientes').delete().eq('id', id);
    if (error) throw error;
    return true;
};

const detalleCliente = async (id) => {
    const { data, error } = await supabase.from('clientes').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
};

const actualizarCliente = async (nombre, email, id) => {
    const { data, error } = await supabase.from('clientes').update({ nombre, email }).eq('id', id).select();
    if (error) throw error;
    return data[0];
};
*/
/*
//-----CON SQL SERVER -----//
const API_URL = "http://localhost:3000/api/clientes";

const listar_clientes = () => 
    fetch(API_URL).then(respuesta => respuesta.json());

const crearCliente = (nombre, email) => {
    const id = crypto.randomUUID();
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nombre, email })
    });
};

const eliminarCliente = (id) => {
    return fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

const detalleCliente = (id) => {
    return fetch(`${API_URL}/${id}`).then(respuesta => respuesta.json());
};

const actualizarCliente = (nombre, email, id) => {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email })
    });
};
*/
//-----CON EXPRESS (MySQL)-----//
const BASE_URL = "http://localhost:3000";

const clientService = {
    // GET - listar todos los clientes
    listar_clientes: async () => {
        const res = await fetch(`${BASE_URL}/clientes`);
        return res.json();
    },
    
    // GET - cliente por id (para editar)
    detalleCliente: async (id) => {
        const res = await fetch(`${BASE_URL}/clientes/${id}`);
        return res.json();
    },
    
    // POST - crear cliente
    crearCliente: async (nombre, email) => {
        const id = crypto.randomUUID();
        const res = await fetch(`${BASE_URL}/clientes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, nombre, email })
        });
        return res.json();
    },
    
    // PUT - actualizar cliente (id, nombre, email)
    actualizarCliente: async (nombre, email, id) => {
        const res = await fetch(`${BASE_URL}/clientes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email })
        });
        return res.json();
    },
    
    // DELETE - eliminar cliente
    eliminarCliente: async (id) => {
        const res = await fetch(`${BASE_URL}/clientes/${id}`, {
            method: "DELETE"
        });
        return res.json();
    }
};

export { clientService };