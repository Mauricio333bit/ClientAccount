const mongoose = require("mongoose");
require("dotenv").config();
const DATABASE_URL = process.env.DATABASE_URL;
const mongodbUrl = DATABASE_URL;
// la url es la del server de mongo atlas, si fuera local seria "mogodb://localhost/nuevaBD y poner a correr la base antes, ademas tener mongo instalado en el local"

async function connectDB() {
  return await mongoose.connect(mongodbUrl); // esta funcion nos devuelve la conexion realizada a la bd alojada en atlas, la cual se importara despues en nuestro server.js
}

mongoose.connection.on("open", (_) => {
  console.log("Conectado a la base de datos" + mongodbUrl);
}); //ejecutamos la funcion que conecta la base, cuando estado de la conexion sea: "abierta" -> se muestra por consola el mensaje

module.exports = connectDB;
