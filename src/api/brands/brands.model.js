// Requerir la librería de mongoose
const mongoose = require("mongoose");
// Creamos un SCHEMA -> Es un método de una clase que nos permite definir un modelo de datos.
const brandSchema = new mongoose.Schema(
  // Type: es el tipo de dato
  // Required: si es un campo obligatorio
  // Trim: elimina los espacios al principio y final
  {
    brand: { type: String, required: true, trim: true },
    year: { type: Number, required: false, trim: true },
    country: { type: String, required: false, trim: true },
    img: { type: String, required: false, trim: true },
  },
  // Timestamps: fecha de creación - modificación
  {
    timestamps: true,
  }
);

// Guardar Brand la referencia y el Schema
// brans - es el nombre de mi colección en la DB
const Brand = mongoose.model("brands", brandSchema);
// Exportar ES5
module.exports = Brand;
