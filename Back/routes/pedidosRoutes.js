const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

// Paso 1: Ruta para recibir el formulario y redirigir con parámetros a resumen.html
router.post('/pedido', pedidosController.procesarPedido);
router.get('/pedido', pedidosController.procesarPedido);

// Paso 2: Ruta para confirmar en la segunda página y realizar la inserción en la BD
router.post('/confirmar-pedido', pedidosController.confirmarPedido);

// Ruta para consultar los pedidos en formato JSON
router.get('/api/pedidos', pedidosController.listarPedidos);

module.exports = router;
