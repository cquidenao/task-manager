import React, { useState } from "react";
import api from "../services/api";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTask = async () => {
    try {
      await api.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      alert("Tarea creada exitosamente");
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  return (
    <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Crear Tarea</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600"
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600"
      />
      <button
        onClick={createTask}
        className="px-4 py-2 bg-green-500 text-white rounded shadow dark:bg-green-700"
      >
        Crear Tarea
      </button>
    </div>
  );
};

export default TaskForm;
