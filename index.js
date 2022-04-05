//Estructura correcta del fichero index.js
// Importar Express -> Métodos o funciones para gestionar mi server
const express = require("express");
// Importar Cors -> Librería que gestiiona proxies o urls permitadas
const cors = require("cors");

// Método de conexión de la DB
const { connect } = require("./src/utils/database/db");

// Info API
const documentation = require('./src/utils/documentation/api.json');


const { configCloudinary } =require('./src/utils/coudinary/config')

// Importar nuestras routes o Endpoints
const BrandsRoutes = require("./src/api/brands/brands.routers");
const VehicleRouters = require("./src/api/vehicles/vehicles.routers");
const UserRouters = require("./src/api/users/users.routers");



// Seleccionar Puerto del .env y si no existe poner 8080
const PORT = process.env.PORT || 8080;


// Inicializar Express
const app = express();

// Ejecutar mi función de conexión a la DB
connect();
configCloudinary();

// Configuar mis cabeceras -> La información de la Petición
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
});

// Config de Proxies + CORS -> Meter vuestros dominios ej: http://minicodelab.dev
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4200",
      "https://the-star-wars-api-omega.vercel.app",
    ],
    credentials: true,
  })
);

// Límite de flujo de información
app.use(express.json({ limit: '5mb' }))


// No codifica caracteres reservador que tienene un significado especial en la URI.
app.use(express.urlencoded({
    limit: '5mb',
    extended: true
}));

// Cargar las rutas
app.use("/api/brands", BrandsRoutes);
app.use("/api/vehicles", VehicleRouters);
app.use("/api/users", UserRouters);

// Documentation de nuestra Api
app.use('/api', (req, res, next) => {
    return res.json(documentation);
});

// Manejador de errores de rutas no encontradas
app.use('*', (req, res, next) => {
    const error = new Error();
    error.status = 404;
    error.message = 'Route not found';
    return next(error);
});

// Control de errores no esperados o del server
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
});


// Queremos ocultar con qué está realizada nuestra API
app.disable('x-powered-by');


// Escuchadores d enuestro server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port 🙈: ${PORT}`);
});


