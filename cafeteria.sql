-- ========================================================
-- SCRIPT DE BASE DE DATOS PARA LA CAFETERÍA (XAMPP / MySQL)
-- ========================================================

-- 1. Creación de la base de datos si no existe
CREATE DATABASE IF NOT EXISTS cafeteria 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 2. Seleccionar la base de datos
USE cafeteria;

-- 3. Creación de la tabla pedidos con los campos de la práctica
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(100) NOT NULL,
    correo VARCHAR(150),
    producto VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL,
    tamano VARCHAR(50) NOT NULL,
    llevar VARCHAR(10) NOT NULL,
    observaciones TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Registro de ejemplo (opcional para pruebas)
-- INSERT INTO pedidos (cliente, correo, producto, cantidad, tamano, llevar, observaciones) 
-- VALUES ('Juan Perez', 'juan@ejemplo.com', 'Capuchino', 2, 'Mediano', 'Sí', 'Sin azúcar');
