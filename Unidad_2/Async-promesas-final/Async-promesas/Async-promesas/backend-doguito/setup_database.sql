-- ============================================
-- Script de creación de base de datos MySQL
-- Doguito Petshop
-- ============================================

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS doguito_petshop 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE doguito_petshop;

-- ============================================
-- Tabla: clientes
-- ============================================
CREATE TABLE IF NOT EXISTS clientes (
    id VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: mascotas
-- ============================================
CREATE TABLE IF NOT EXISTS mascotas (
    id VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    raza VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    peso DECIMAL(5,2) NOT NULL,
    dueñoId VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (dueñoId) REFERENCES clientes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: productos
-- ============================================
CREATE TABLE IF NOT EXISTS productos (
    id VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Datos de ejemplo
-- ============================================

-- Insertar clientes
INSERT INTO clientes (id, nombre, email) VALUES
('1', 'Juan Pérez', 'juan@email.com'),
('3', 'Carlos López', 'carlos@email.com')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), email=VALUES(email);

-- Insertar mascotas
INSERT INTO mascotas (id, nombre, raza, edad, peso, dueñoId) VALUES
('1', 'Firulais', 'Labrador', 3, 25.00, '1'),
('3', 'Max', 'Golden Retriever', 4, 28.00, '1'),
('Zo7AuA19wbU', 'Goku', 'Panda', 2, 34.00, '1')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), raza=VALUES(raza), edad=VALUES(edad), peso=VALUES(peso), dueñoId=VALUES(dueñoId);

-- Insertar productos
INSERT INTO productos (id, nombre, precio) VALUES
('2', 'Juguete mordedor', 75.00),
('3', 'Cama para mascotas', 350.00),
('5', 'Plato de comida', 30.00)
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), precio=VALUES(precio);

-- ============================================
-- Verificación
-- ============================================
SELECT 'Base de datos creada exitosamente' AS status;
SELECT COUNT(*) AS total_clientes FROM clientes;
SELECT COUNT(*) AS total_mascotas FROM mascotas;
SELECT COUNT(*) AS total_productos FROM productos;
