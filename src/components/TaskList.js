import React, { useState, useEffect } from "react";
import api from "../services/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [viewedTaskId, setViewedTaskId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editFields, setEditFields] = useState({ title: "", description: "" });

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  const completeTask = async (id, completed) => {
    try {
      await api.put(`/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const saveEditedTask = async (id) => {
    try {
      await api.put(`/tasks/${id}`, editFields);
      setEditingTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Tareas</h1>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-md"
            style={{
              borderLeftWidth: "6px",
              borderColor: task.completed ? "#32E2F6" : "#FF5733", // Verde para completadas, rojo para pendientes
            }}
          >
            {editingTaskId === task._id ? (
              <div>
                <h2 className="text-lg font-bold mb-4">Editar Tarea</h2>
                <input
                  type="text"
                  placeholder="Título"
                  value={editFields.title}
                  onChange={(e) =>
                    setEditFields({ ...editFields, title: e.target.value })
                  }
                  className="w-full p-2 border rounded mb-3"
                />
                <textarea
                  placeholder="Descripción"
                  value={editFields.description}
                  onChange={(e) =>
                    setEditFields({
                      ...editFields,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded mb-3"
                ></textarea>
                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded shadow"
                    onClick={() => saveEditedTask(task._id)}
                  >
                    Guardar Cambios
                  </button>
                  <button
                    className="px-4 py-2 border rounded shadow"
                    onClick={() => setEditingTaskId(null)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold">{task.title}</h2>
                  <span
                    className={`px-2 py-1 text-sm font-semibold rounded ${
                      task.completed
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {task.completed ? "Completada" : "Pendiente"}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
                {viewedTaskId === task._id && (
                  <div className="mt-3 text-sm text-gray-600">
                    <p>
                      <strong>ID:</strong> {task._id}
                    </p>
                    <p>
                      <strong>Fecha de Creación:</strong>{" "}
                      {formatDate(task.createdAt)}
                    </p>
                  </div>
                )}
                <div className="flex mt-4 justify-between">
                  <button
                    className={`px-4 py-2 rounded shadow ${
                      task.completed
                        ? "bg-secondary text-white"
                        : "bg-primary text-white"
                    }`}
                    onClick={() => completeTask(task._id, task.completed)}
                  >
                    {task.completed
                      ? "Marcar como Pendiente"
                      : "Marcar como Completada"}
                  </button>
                  <button
                    className="px-4 py-2 border rounded shadow"
                    onClick={() =>
                      setViewedTaskId(
                        viewedTaskId === task._id ? null : task._id
                      )
                    }
                  >
                    {viewedTaskId === task._id
                      ? "Ocultar Detalles"
                      : "Ver Detalles"}
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded shadow"
                    onClick={() => {
                      setEditingTaskId(task._id);
                      setEditFields({
                        title: task.title,
                        description: task.description,
                      });
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded shadow"
                    onClick={() => deleteTask(task._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
