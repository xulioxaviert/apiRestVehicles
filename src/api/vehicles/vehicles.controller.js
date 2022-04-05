const Vehicle = require("./vehicles.model");

//borrado de las imagenes asociadas:
const {
  deleteImgCloudinary,
} = require("../../middlewares/deleteFile.middleware");


// Metodo para recuperar todos los vehicles de nuestra DB
const getAll = async (req, res, next) => {
  try {
    // Popular datos -> sin ello te devuelve unicamente los ids de las marcas
    const vehicles = await Vehicle.find().populate("brands");
    res.status(200).json(vehicles);
  } catch (error) {
    return next(error);
  }
};

// Metodo para recuperar un vehicle de nuestra DB
const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id).populate("brands");
    res.status(200).json(vehicle);
  } catch (error) {
    return next(error);
  }
};

// Método para crear un vehicle
const postOne = async (req, res, next) => {
  console.log(req.body);
  try {
    const vehicle = new Vehicle();
    vehicle.brands = req.body.brands;
    vehicle.models = req.body.models;
    vehicle.year = req.body.year;
    vehicle.type = req.body.type;
    vehicle.fuel = req.body.fuel;
    if (req.file) vehicle.img = req.file.path;
    const vehicleDB = await vehicle.save();
    return res.status(201).json(vehicleDB);
  } catch (error) {
    return next(error);
  }
};

// Método para modificar un vehicle en base a su id
const patchOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = new Vehicle(req.body);
    vehicle._id = id;
    if (req.file) vehicle.img = req.file.path;
    const updateVehicle = await Vehicle.findByIdAndUpdate(id, vehicle);
    return res.status(200).json(updateVehicle);
  } catch (error) {
    return next(error);
  }
};

// Método para eliminar un vehicle en base a su id
const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if(vehicle.img) deleteImgCloudinary(vehicle.img)
    return res.status(200).json(vehicle);
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
