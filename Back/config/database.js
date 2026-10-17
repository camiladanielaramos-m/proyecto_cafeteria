// Conexión a la base de datos MySQL con mysql2/promise
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de conexión para XAMPP
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cafeteria',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Inicialización automática de la base de datos y tabla 'pedidos' si no existen en XAMPP
async function inicializarBD() {
    try {
        // Conexión inicial al servidor MySQL sin especificar base de datos
        const conexionInicial = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            port: dbConfig.port
        });

        // Crear base de datos si no existe
        await conexionInicial.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
        await conexionInicial.end();

        // Crear la tabla 'pedidos' si no existe
        await pool.query(`
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
        `);
        console.log('✔ Conexión exitosa a MySQL: Base de datos y tabla `pedidos` listas.');
    } catch (error) {
        console.log('ℹ Nota XAMPP: Para guardar en BD, recuerda iniciar el módulo MySQL en XAMPP Control Panel.', error.message);
    }
}

// Ejecutar verificación al arrancar
inicializarBD();

module.exports = pool;
