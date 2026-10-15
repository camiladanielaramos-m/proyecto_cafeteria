const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

// Ruta POST para registrar el pedido
router.post('/pedido', pedidosController.registrarPedido);

// Ruta GET opcional para soportar también envío por método GET
router.get('/pedido', pedidosController.registrarPedido);

module.exports = router;
