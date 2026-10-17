const pedidoModel = require('../models/pedidoModel');

// 1. Paso 1: Procesar formulario de index.html y enviar datos por parámetros a resumen.html
async function procesarPedido(req, res) {
    const cliente = (req.body.cliente || req.query.cliente || '').toString();
    const correo = (req.body.correo || req.query.correo || '').toString();
    const producto = (req.body.producto || req.query.producto || '').toString();
    const cantidad = parseInt(req.body.cantidad || req.query.cantidad || '1', 10);
    const tamano = (req.body.tamano || req.query.tamano || 'Mediano').toString();
    const llevar = req.body.llevar ? 'Sí' : (req.query.llevar || 'No');
    const observaciones = (req.body.observaciones || req.query.observaciones || 'Ninguna').toString();

    // Validaciones básicas tal como se explicó en clase
    if (!cliente.trim() || !producto.trim() || isNaN(cantidad) || cantidad < 1) {
        return res.status(400).send('Datos del pedido son inválidos');
    }

    // Redirección con parámetros hacia la segunda página (resumen.html)
    const params = new URLSearchParams({
        cliente: cliente.trim(),
        correo: correo.trim(),
        producto: producto.trim(),
        cantidad: cantidad.toString(),
        tamano: tamano,
        llevar: llevar,
        observaciones: observaciones.trim()
    });

    res.redirect(`/resumen.html?${params.toString()}`);
}

// 2. Paso 2: Al confirmar en la segunda página, se inserta el registro en la base de datos (MVC)
async function confirmarPedido(req, res) {
    const cliente = (req.body.cliente || '').toString();
    const correo = (req.body.correo || '').toString();
    const producto = (req.body.producto || '').toString();
    const cantidad = parseInt(req.body.cantidad || '1', 10);
    const tamano = (req.body.tamano || 'Mediano').toString();
    const llevar = (req.body.llevar || 'No').toString();
    const observaciones = (req.body.observaciones || 'Ninguna').toString();

    // Validación antes de guardar en la base de datos
    if (!cliente.trim() || !producto.trim() || isNaN(cantidad) || cantidad < 1) {
        return res.status(400).json({
            success: false,
            mensaje: 'Datos inválidos para registrar en la base de datos'
        });
    }

    try {
        // Invocación al modelo para realizar la consulta INSERT
        const insertId = await pedidoModel.registrarPedido(
            cliente.trim(),
            correo.trim(),
            producto.trim(),
            cantidad,
            tamano,
            llevar,
            observaciones.trim()
        );

        return res.json({
            success: true,
            id: insertId,
            mensaje: 'Pedido confirmado y guardado exitosamente en la base de datos MySQL (XAMPP)'
        });
    } catch (error) {
        console.error('Error en controlador al confirmar pedido:', error);
        return res.status(500).json({
            success: false,
            mensaje: 'Error al insertar en la base de datos. Verifica que MySQL esté activo en XAMPP.',
            error: error.message
        });
    }
}

// 3. Listar pedidos (opcional)
async function listarPedidos(req, res) {
    try {
        const pedidos = await pedidoModel.obtenerPedidos();
        res.json({ success: true, data: pedidos });
    } catch (error) {
        res.status(500).json({ success: false, mensaje: 'Error al obtener los pedidos' });
    }
}

module.exports = {
    procesarPedido,
    confirmarPedido,
    listarPedidos
};
