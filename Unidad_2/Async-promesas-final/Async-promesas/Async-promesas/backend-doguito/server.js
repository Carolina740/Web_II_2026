import express from 'express';
import cors    from 'cors';
import dotenv  from 'dotenv';
import { pool } from './conexion.js';   // pool de MySQL2

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ──────────────────────────────────────────────
//  CLIENTES
// ──────────────────────────────────────────────

// GET — listar todos
app.get('/clientes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET — por id
app.get('/clientes/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM clientes WHERE id = ?', [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST — crear
app.post('/clientes', async (req, res) => {
    try {
        const { id, nombre, email } = req.body;
        await pool.query(
            'INSERT INTO clientes (id, nombre, email) VALUES (?, ?, ?)',
            [id, nombre, email]
        );
        res.status(201).json({ id, nombre, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT — actualizar
app.put('/clientes/:id', async (req, res) => {
    try {
        const { nombre, email } = req.body;
        await pool.query(
            'UPDATE clientes SET nombre = ?, email = ? WHERE id = ?',
            [nombre, email, req.params.id]
        );
        const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE — eliminar
app.delete('/clientes/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM clientes WHERE id = ?', [req.params.id]);
        res.json({ message: 'Cliente eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ──────────────────────────────────────────────
//  MASCOTAS
// ──────────────────────────────────────────────

// GET — listar todas
app.get('/mascotas', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM mascotas');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET — por id
app.get('/mascotas/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM mascotas WHERE id = ?', [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Mascota no encontrada' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST — crear
app.post('/mascotas', async (req, res) => {
    try {
        const { id, nombre, edad, raza, peso, dueñoId } = req.body;
        await pool.query(
            'INSERT INTO mascotas (id, nombre, edad, raza, peso, duenoId) VALUES (?, ?, ?, ?, ?, ?)',
            [id, nombre, edad, raza, peso, dueñoId]
        );
        res.status(201).json({ id, nombre, edad, raza, peso, dueñoId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT — actualizar
app.put('/mascotas/:id', async (req, res) => {
    try {
        const { nombre, edad, raza, peso, dueñoId } = req.body;
        await pool.query(
            'UPDATE mascotas SET nombre = ?, edad = ?, raza = ?, peso = ?, duenoId = ? WHERE id = ?',
            [nombre, edad, raza, peso, dueñoId, req.params.id]
        );
        const [rows] = await pool.query('SELECT * FROM mascotas WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Mascota no encontrada' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE — eliminar
app.delete('/mascotas/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM mascotas WHERE id = ?', [req.params.id]);
        res.json({ message: 'Mascota eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ──────────────────────────────────────────────
//  PRODUCTOS
// ──────────────────────────────────────────────

// GET — listar todos
app.get('/productos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET — por id
app.get('/productos/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM productos WHERE id = ?', [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST — crear
app.post('/productos', async (req, res) => {
    try {
        const { id, nombre, precio, descripcion, idCliente } = req.body;
        await pool.query(
            'INSERT INTO productos (id, nombre, precio, descripcion, idCliente) VALUES (?, ?, ?, ?, ?)',
            [id, nombre, precio, descripcion || null, idCliente || null]
        );
        res.status(201).json({ id, nombre, precio, descripcion, idCliente });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT — actualizar
app.put('/productos/:id', async (req, res) => {
    try {
        const { nombre, precio, descripcion, idCliente } = req.body;
        await pool.query(
            'UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, idCliente = ? WHERE id = ?',
            [nombre, precio, descripcion || null, idCliente || null, req.params.id]
        );
        const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE — eliminar
app.delete('/productos/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ──────────────────────────────────────────────
app.listen(3000, () => {
    console.log(`Servidor corriendo en puerto 3000`);
});