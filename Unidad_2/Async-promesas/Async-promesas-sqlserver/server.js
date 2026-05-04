import express from 'express';
import cors from 'cors';
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// SQL Server config
const sqlConfig = {
  server: process.env.MSSQL_SERVER || 'DESKTOP-JRT9L67\\SQL_DEVELOPER',
  options: {
    instanceName: 'SQL_DEVELOPER',
    trustedConnection: true,
    trustServerCertificate: true
  },
  database: process.env.MSSQL_DATABASE || 'doguito-petshop',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool;

// Connect to SQL Server
async function connectDB() {
  try {
console.log('Config server:', sqlConfig.server);
console.log('Config options:', sqlConfig.options);
console.log('Config database:', sqlConfig.database);
    pool = await sql.connect(sqlConfig);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    console.log('Try: MSSQL_SERVER=DESKTOP-JRT9L67\\\\SQL_DEVELOPER,56596 in .env');
    process.exit(1);
  }
}

// GET /api/clientes
app.get('/api/clientes', async (req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM clientes');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/clientes
app.post('/api/clientes', async (req, res) => {
  try {
    const { nombre, email } = req.body;
const id = crypto.randomUUID?.() || Date.now().toString(); // Node.js built-in UUID or fallback
    await pool.request()
      .input('id', sql.NVarChar, id)
      .input('nombre', sql.NVarChar, nombre)
      .input('email', sql.NVarChar, email)
      .query('INSERT INTO clientes (id, nombre, email) VALUES (@id, @nombre, @email)');
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/clientes?id=xxx
app.delete('/api/clientes', async (req, res) => {
  try {
    const id = req.query.id;
    await pool.request()
      .input('id', sql.NVarChar, id)
      .query('DELETE FROM clientes WHERE id = @id');
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/clientes?id=xxx
app.get('/api/clientes', async (req, res) => {
  try {
    const id = req.query.id;
    const result = await pool.request()
      .input('id', sql.NVarChar, id)
      .query('SELECT * FROM clientes WHERE id = @id');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Cliente not found' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/clientes
app.put('/api/clientes', async (req, res) => {
  try {
    const { id, nombre, email } = req.body;
    await pool.request()
      .input('id', sql.NVarChar, id)
      .input('nombre', sql.NVarChar, nombre)
      .input('email', sql.NVarChar, email)
      .query('UPDATE clientes SET nombre = @nombre, email = @email WHERE id = @id');
    res.json({ updated: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mascotas APIs
app.get('/api/mascotas', async (req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM mascotas');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/mascotas', async (req, res) => {
  try {
    const { nombre, edad, raza, peso, duenoId } = req.body;
const id = 'm' + (crypto.randomUUID?.() || Date.now().toString()).slice(0, 8);
    await pool.request()
      .input('id', sql.NVarChar, id)
      .input('nombre', sql.NVarChar, nombre)
      .input('edad', sql.Int, parseInt(edad))
      .input('raza', sql.NVarChar, raza)
      .input('peso', sql.Decimal(5,2), parseFloat(peso))
      .input('duenoId', sql.NVarChar, duenoId)
      .query('INSERT INTO mascotas (id, nombre, edad, raza, peso, duenoId) VALUES (@id, @nombre, @edad, @raza, @peso, @duenoId)');
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/mascotas', async (req, res) => {
  try {
    const id = req.query.id;
    await pool.request()
      .input('id', sql.NVarChar, id)
      .query('DELETE FROM mascotas WHERE id = @id');
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/mascotas', async (req, res) => {
  try {
    const id = req.query.id;
    const result = await pool.request()
      .input('id', sql.NVarChar, id)
      .query('SELECT * FROM mascotas WHERE id = @id');
    if (result.recordset.length === 0) return res.status(404).json({ error: 'Mascota not found' });
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/mascotas', async (req, res) => {
  try {
    const { id, nombre, edad, raza, peso, duenoId } = req.body;
    await pool.request()
      .input('id', sql.NVarChar, id)
      .input('nombre', sql.NVarChar, nombre)
      .input('edad', sql.Int, parseInt(edad))
      .input('raza', sql.NVarChar, raza)
      .input('peso', sql.Decimal(5,2), parseFloat(peso))
      .input('duenoId', sql.NVarChar, duenoId || null)
      .query('UPDATE mascotas SET nombre = @nombre, edad = @edad, raza = @raza, peso = @peso, duenoId = @duenoId WHERE id = @id');
    res.json({ updated: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Productos APIs (similar pattern)
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM productos');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/productos', async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    const id = crypto.randomUUID();
    await pool.request()
      .input('id', sql.NVarChar, id)
      .input('nombre', sql.NVarChar, nombre)
      .input('precio', sql.Decimal(10,2), parseFloat(precio))
      .input('descripcion', sql.NVarChar, descripcion)
      .query('INSERT INTO productos (id, nombre, precio, descripcion) VALUES (@id, @nombre, @precio, @descripcion)');
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/productos', async (req, res) => {
  try {
    const id = req.query.id;
    await pool.request()
      .input('id', sql.NVarChar, id)
      .query('DELETE FROM productos WHERE id = @id');
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/productos', async (req, res) => {
  try {
    const id = req.query.id;
    const result = await pool.request()
      .input('id', sql.NVarChar, id)
      .query('SELECT * FROM productos WHERE id = @id');
    if (result.recordset.length === 0) return res.status(404).json({ error: 'Producto not found' });
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/productos', async (req, res) => {
  try {
    const { id, nombre, precio, descripcion } = req.body;
    await pool.request()
      .input('id', sql.NVarChar, id)
      .input('nombre', sql.NVarChar, nombre)
      .input('precio', sql.Decimal(10,2), parseFloat(precio))
      .input('descripcion', sql.NVarChar, descripcion)
      .query('UPDATE productos SET nombre = @nombre, precio = @precio, descripcion = @descripcion WHERE id = @id');
    res.json({ updated: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Copy .env.example to .env and fill SQL Server details');
});

process.on('SIGINT', async () => {
  await pool.close();
  server.close();
  process.exit(0);
});
