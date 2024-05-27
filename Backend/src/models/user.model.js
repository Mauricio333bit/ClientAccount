const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true, // no ser guardaran objetos si falta el fullname: es requerido
    trim: true, //quita espacios en blanco del valor ingresado: " dasd  "-> "dasd"
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, //impide que se repitan los valores de email
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  cuit: {
    type: String,
    required: true,
    trim: true,
  },
  resgistrationDate: {
    type: Date,
    default: Date.now(),
  },
  rol: {
    type: String,
    enum: ["ROLE_ADMIN", "ROLE_USER"],
    default: "ROLE_USER",
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, refer: "Order" }], //se creará el objeto order
});
// el esquema es como una interfaz, el esqueleto de como va ser el objeto en mongo definiendo cada variable/atributo

const User = mongoose.model("User", userSchema);
//mongoose es lo que se comunica con la db, le indicamos como debera guardar los objetos y este nos da metodos para consultar a la bd
// users
//     {}
//     {}

module.exports = User;
