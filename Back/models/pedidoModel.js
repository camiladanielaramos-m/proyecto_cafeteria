const db = require('../config/database');

// Modelo para manejar las consultas del pedido hacia la base de datos
async function registrarPedido(cliente, producto, cantidad, tamano, llevar, observaciones) {
    try {
        const [resultado] = await db.execute(
            'INSERT INTO pedidos (cliente, producto, cantidad, tamano, llevar, observaciones) VALUES (?, ?, ?, ?, ?, ?)',
            [cliente, producto, cantidad, tamano, llevar, observaciones]
        );
        return resultado.insertId;
    } catch (error) {
        // En esta primera entrega donde el objetivo principal es conectar las 2 páginas por parámetros,
        // capturamos el error de forma segura en caso de que el servicio MySQL aún no esté iniciado.
        console.log('Nota BD: Conexión a MySQL opcional en esta fase:', error.message);
        return null;
    }
}

module.exports = {
    registrarPedido
};
