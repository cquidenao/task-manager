const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para servir el frontend
app.use(express.static(path.join(__dirname, 'frontend/build')));

// API del backend
app.use('/api/tasks', require('./backend/routes/taskRoutes'));

// Cualquier ruta no manejada por el backend devuelve el frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
