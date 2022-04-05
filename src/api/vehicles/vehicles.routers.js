// Es el enrutamiento | EndPoints que nos da express
const VehicleRouters = require("express").Router();

const { isAuth } = require("../../middlewares/auth.middleware");

const upload = require("../../middlewares/updateFile.middleware");

// Importación en ES5 - Métodos de controller
const {
  getAll,
  getOne,
  postOne,
  patchOne,
  deleteOne,
} = require("./vehicles.controller");

// Traer todos los vehicle en el endpoint /all
VehicleRouters.get("/", getAll);
// Traer vehicle por id
VehicleRouters.get("/:id", getOne);
// Crear un vehicle POST
VehicleRouters.post("/", [isAuth], upload.single("img"), postOne);
// Modificar vehicle
VehicleRouters.patch("/:id", [isAuth], upload.single("img"), patchOne);
// Delete vehicle
VehicleRouters.delete("/:id", [isAuth], deleteOne);
////
module.exports = VehicleRouters;
