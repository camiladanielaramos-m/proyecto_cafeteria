const express = require('express'); // Importamos la libreria Express
const path = require('path');
require('dotenv').config();

const app = express(); // Creamos el servidor/Aplicacion
const PORT = process.env.PORT || 3000;

// Middleware para procesar datos enviados desde formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir la carpeta Front (Vista: HTML, CSS, JS) como archivos estáticos
app.use(express.static(path.join(__dirname, '../Front')));

// Importamos las rutas de pedidos
const pedidosRoutes = require('./routes/pedidosRoutes');
app.use('/', pedidosRoutes);

// Solicitud de información desde la ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front/index.html'));
});

// Iniciamos el servidor y escucha solicitudes
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en el puerto ${PORT}`);
    console.log(`Abre en tu navegador: http://localhost:${PORT}`);
});
