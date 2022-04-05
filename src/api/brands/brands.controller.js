const Brand = require("./brands.model");
// Middleware 
const {
  deleteImgCloudinary,
} = require("../../middlewares/deleteFile.middleware");

// Metodo para recuperar todos las Brands de nuestra DB
const getAll = async (req, res, next) => {
  try {
    // find es un método de mongoose para recuperar todos los registros
    const brands = await Brand.find();
    // res - es loq ue enviaremos al frontal
    // cabecera - status 200 Todo OK
    // cuerpo -> brand - json
    res.status(200).json(brands);
  } catch (error) {
    return next(error);
  }
};

// Metodo para recuperar una Brand de nuestra DB
const getOne = async (req, res, next) => {
  try {
    // req -> recuperar valores de la request: http://jdhfjdh....
    const { id } = req.params;
    // findById en el que por param recibe un id y te lo busca
    const brand = await Brand.findById(id);
    res.status(200).json(brand);
  } catch (error) {
    return next(error);
  }
};

// Método para crear un nuevo brand
const postOne = async (req, res, next) => {
  try {
    // Nueva Brand para introducir los datos del front
    const brand = new Brand();
    // Este body es la info que nos llega desde el front
    brand.brand = req.body.brand;
    brand.year = req.body.year;
    brand.country = req.body.country;
    brand.img = req.body.img;
    
    // Método de mongoose - que guarda la Brand  en la DB
    const brandDB = await brand.save();
    return res.status(201).json(brandDB);
  } catch (error) {
    return next(error);
  }
};

// Método para modificar una Brand en base a su id
const patchOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = new Brand();
    brand.brand = req.body.brand;
    brand.year = req.body.year;
    brand.country = req.body.country;
    if (req.file) brand.img = req.file.path;
    // id nos lo generan y es un numero único
    brand._id = id;
    // updatear la marca -> Método de mongoose - que sustituye la Brand en la DB
    // Param 1- el id recuperado
    // param 2 - el actor con la info del front
    const updateBrand = await Brand.findByIdAndUpdate(id, brand);
    return res.status(200).json(updateBrand);
  } catch (error) {
    return next(error);
  }
};

// Método para eliminar una brand en base a su id
const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    // borrar una brand-> Método de mongoose - que borra el actor en la DB por el id recuperado

    const brand = await Brand.findByIdAndDelete(id);
    if(brand.img) deleteImgCloudinary(req.img)
    return res.status(200).json(brand);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  postOne,
  patchOne,
  deleteOne,
};
