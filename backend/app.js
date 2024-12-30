const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const { swaggerUi, swaggerDocs } = require('./swagger');
const path = require('path');



// Configuración de dotenv
dotenv.config();
console.log('Archivo .env cargado.');
console.log('Mongo URI desde dotenv:', process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;


// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(cors());
console.log('CORS habilitado.');

app.use(express.json());
console.log('Middleware JSON habilitado.');

// Rutas
app.use('/api/tasks', taskRoutes);
console.log('Rutas de tareas configuradas.');

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error);
    });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});
