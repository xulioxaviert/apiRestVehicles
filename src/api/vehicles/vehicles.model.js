// Requerir la librería de mongoose
const mongoose = require("mongoose");

// Creamos un SCHEMA -> Es un método de una clase que nos permite definir un modelo de datos.
const vehiclesSchema = new mongoose.Schema(
  // Type: es el tipo de dato
  // Required: si es un campo obligatorio
  // Trim: elimina los espacios al principio y final
  {
    models: { type: String, required: false, trim: true },
    year: { type: Number, required: false, trim: true },
    fuel: { type: String, required: false, trim: true },
    type: { type: String, required: false, trim: true },
    img: { type: String, required: false, trim: true },
    // Este es un array de ids - que hace referencia al modelo de 
    brands: [
      { type: mongoose.Schema.Types.ObjectId, ref: "brands", required: true },
    ],
    //brand: { type: String, required: true, trim: true },
  },
  // Timestamps: fecha de creación - modificación
  {
    timestamps: true,
  }
);

// Guardar en Motorcycle la referencia y el Schema
// motorcycles - es el nombre de mi colección en la DB
const Vehicle = mongoose.model("vehicles", vehiclesSchema);
// Exportar ES5
module.exports = Vehicle;
