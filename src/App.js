import React, { useContext } from "react";
import { ThemeContext } from "./Context/ThemeContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "dark bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } flex flex-col items-center`}
    >
      <header className="w-full max-w-4xl flex justify-between items-center bg-primary text-white p-4 rounded-md shadow-md">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <div className="flex gap-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700"
          >
            {theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
          </button>
          
        </div>
      </header>
      <main className="w-full max-w-4xl mt-6 p-6">
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
};

export default App;
