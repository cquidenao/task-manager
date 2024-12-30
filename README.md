Proyecto Task Manager
Este proyecto es una aplicación de gestión de tareas que permite a los usuarios crear, editar, completar, y eliminar tareas. El sistema cuenta con un frontend que interactúa con un backend para gestionar las tareas, utilizando una base de datos MongoDB.

🛠 Tecnologías Usadas
Frontend: React, Tailwind CSS
Backend: Node.js, Express, MongoDB
Base de datos: MongoDB
🚀 Instalación y Ejecución Local
Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local.

1. Clonar el Repositorio


bash
Copiar código
git clone https://github.com/cquidenao/task-manager.git

2. Configurar el Backend
Navega al directorio del backend:

bash
Copiar código
cd backend
Instala las dependencias:

bash
Copiar código
npm install
Configura las variables de entorno:

Crea un archivo .env en el directorio raíz del backend con el siguiente contenido:

env
Copiar código
PORT=5000
MONGO_URI=tu_conexion_a_mongodb
PORT: Define el puerto en el que el servidor backend estará escuchando. En este ejemplo, está configurado para usar el puerto 5000.

MONGO_URI: La URI de conexión a tu base de datos MongoDB. Puedes obtenerla de tu proveedor de MongoDB o usar un MongoDB local.

Ejecuta el servidor:

bash
Copiar código
npm run dev
El backend estará disponible en http://localhost:5000.

3. Configurar el Frontend
Navega al directorio del frontend:

bash
Copiar código
cd frontend
Instala las dependencias:

bash
Copiar código
npm install
Configura las variables de entorno:

Crea un archivo .env en el directorio raíz del frontend con el siguiente contenido:

env
Copiar código
REACT_APP_BACKEND_URL=http://localhost:5000
Ejecuta el frontend:

bash
Copiar código
npm run dev
El frontend estará disponible en http://localhost:3000.

4. Configuración de Modo Oscuro
Para activar el modo oscuro en la aplicación, el frontend utiliza un contexto de tema que puede ser alternado por el usuario. El modo oscuro se activa automáticamente al seleccionar la opción en el botón "Modo Oscuro".

El código necesario para este comportamiento está configurado en el contexto ThemeContext, y el valor se almacena en el localStorage para mantener el estado del tema.

📦 Funcionalidades
Gestión de tareas: El usuario puede crear, editar, marcar como completada y eliminar tareas.
Modo oscuro: La aplicación soporta un modo oscuro que puede ser alternado.
Base de datos: Las tareas se guardan y gestionan en una base de datos MongoDB.
🔧 Dependencias
Backend
express: Framework para construir la API REST.
mongoose: Librería para interactuar con MongoDB.
dotenv: Cargar las variables de entorno.
cors: Habilitar CORS en el servidor.
swagger-jsdoc, swagger-ui-express: Para la documentación de la API.
Frontend
react: Librería de JavaScript para construir la interfaz de usuario.
react-dom: Manipula el DOM para renderizar componentes.
axios: Cliente HTTP para realizar peticiones a la API.
tailwindcss: Framework CSS para diseño rápido y eficiente.
classnames: Utilidad para condicionalmente aplicar clases de estilo en React.
⚙️ Despliegue
Para desplegar la aplicación, te recomendamos usar plataformas como Heroku, Render, o Vercel para el frontend y Railway o Heroku para el backend.

Despliegue del Backend
Configura tu entorno de producción en el archivo .env en el servidor backend.
Sube el backend a una plataforma como Railway o Heroku.
Asegúrate de tener configurada la variable de entorno MONGO_URI para que apunte a una base de datos MongoDB en la nube (por ejemplo, MongoDB Atlas).
Despliegue del Frontend
Sube el frontend a una plataforma como Vercel o Netlify.
Asegúrate de que la variable REACT_APP_BACKEND_URL esté configurada con la URL del backend desplegado.
📝 Notas Adicionales
Si deseas agregar más funcionalidades como autenticación o manejo de usuarios, puedes usar JWT para el backend y almacenar el token en el frontend utilizando localStorage o cookies.
Es recomendable usar PM2 o alguna otra herramienta similar para manejar el backend en producción.
