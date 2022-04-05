// Es el enrutamiento | EndPoints que nos da express
const BrandsRoutes = require("express").Router();

const { isAuth } = require('../../middlewares/auth.middleware');

const upload = require("../../middlewares/updateFile.middleware"); 

// Importación en ES5 - Métodos de controller
const {
  getAll,
  getOne,
  postOne,
  patchOne,
  deleteOne,
} = require("./brands.controller");

// Traer todos las Brands en el endpoint /all
BrandsRoutes.get("/", getAll);
// Traer Brands por id
BrandsRoutes.get("/:id", getOne);
// Crear un brands POST
BrandsRoutes.post("/", [isAuth], upload.single("img"), postOne);
// Modificar brands
BrandsRoutes.patch("/:id", [isAuth], upload.single("img"),  patchOne);
// Delete brands
BrandsRoutes.delete("/:id", [isAuth], deleteOne);

module.exports = BrandsRoutes;
