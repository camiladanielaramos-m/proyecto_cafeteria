const pedidoModel = require('../models/pedidoModel');

async function registrarPedido(req, res) {
    // Obtención de datos del formulario (soporta POST y GET)
    const cliente = (req.body.cliente || req.query.cliente || '').toString();
    const correo = (req.body.correo || req.query.correo || '').toString();
    const producto = (req.body.producto || req.query.producto || '').toString();
    const cantidad = parseInt(req.body.cantidad || req.query.cantidad || '1', 10);
    const tamano = (req.body.tamano || req.query.tamano || 'Mediano').toString();
    const llevar = req.body.llevar ? 'Sí' : (req.query.llevar || 'No');
    const observaciones = (req.body.observaciones || req.query.observaciones || 'Ninguna').toString();

    // Validaciones de datos tal como se explicó en clase
    if (
        !cliente.trim() ||
        typeof producto !== 'string' ||
        !producto.trim() ||
        !Number.isInteger(cantidad) ||
        cantidad < 1
    ) {
        return res.status(400).send('Datos del pedido son inválidos');
    }

    // Llamado al modelo (registro en base de datos)
    try {
        await pedidoModel.registrarPedido(
            cliente.trim(),
            producto.trim(),
            cantidad,
            tamano,
            llevar,
            observaciones.trim()
        );
    } catch (error) {
        console.log('Aviso base de datos:', error.message);
    }

    // Envío y recepción de la información por parámetros hacia la vista resumen.html
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

module.exports = {
    registrarPedido
};
