const Task = require('../models/Task');

// Crear una nueva tarea
exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'El campo "title" es obligatorio' });
        }

        const newTask = new Task({ title, description });
        await newTask.save();

        res.status(201).json({
            message: 'Tarea creada exitosamente',
            task: newTask, // `createdAt` ya viene incluido automáticamente
        });
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
};

// Obtener todas las tareas, con la opción de filtrar por estado
exports.getAllTasks = async (req, res) => {
    try {
        const { completed } = req.query;

        let filter = {};
        if (completed !== undefined) {
            filter.completed = completed === 'true'; // Convierte a booleano
        }

        const tasks = await Task.find(filter); // Aplica el filtro a la consulta
        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
};

// Obtener una tarea específica por ID
exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id); // Incluye `createdAt` automáticamente
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json({ task });
    } catch (error) {
        console.error('Error al obtener la tarea:', error);
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
};

// Actualizar una tarea por ID
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true, runValidators: true } // Retorna la tarea actualizada
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.status(200).json({ message: 'Tarea actualizada exitosamente', task: updatedTask });
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
};

// Eliminar una tarea por ID
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id); // Elimina la tarea por su ID

        if (!deletedTask) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.status(200).json({ message: 'Tarea eliminada exitosamente', task: deletedTask });
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};
