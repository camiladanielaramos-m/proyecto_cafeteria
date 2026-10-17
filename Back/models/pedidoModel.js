const db = require('../config/database');

// Modelo para manejar las consultas del pedido hacia la base de datos MySQL (Patrón MVC)
async function registrarPedido(cliente, correo, producto, cantidad, tamano, llevar, observaciones) {
    try {
        const [resultado] = await db.execute(
            'INSERT INTO pedidos (cliente, correo, producto, cantidad, tamano, llevar, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [cliente, correo, producto, cantidad, tamano, llevar, observaciones]
        );
        return resultado.insertId;
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error.message);
        throw error;
    }
}

// Función opcional para consultar los pedidos registrados
async function obtenerPedidos() {
    try {
        const [filas] = await db.execute('SELECT * FROM pedidos ORDER BY id DESC');
        return filas;
    } catch (error) {
        console.error('Error al consultar pedidos:', error.message);
        throw error;
    }
}

module.exports = {
    registrarPedido,
    obtenerPedidos
};
