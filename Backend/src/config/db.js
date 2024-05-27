const mongoose = require("mongoose");

const mongodbUrl =
  "mongodb+srv://mauricioquirogadev:DUPAxexnFzln3BJ1@cluster0.v2raxrc.mongodb.net/?retryWrites=true&w=majority";

//   "mongodb+srv://stevenG:PaoVPqLRxD8PuIjh@mauricioquirogamdb.jznmyaa.mongodb.net/?retryWrites=true&w=majority&appName=MauricioQuirogaMDB"; esta url funciona para las ip en la lista blanca de atlas. Se configura en network access

// la url es la del server de mongo atlas, si fuera local seria "mogodb://localhost/nuevaBD y poner a correr la base antes, ademas tener mongo instalado en el local"

async function connectDB() {
  return await mongoose.connect(mongodbUrl); // esta funcion nos devuelve la conexion realizada a la bd alojada en atlas, la cual se importara despues en nuestro server.js
}

mongoose.connection.on("open", (_) => {
  console.log("Conectado a la base de datos" + mongodbUrl);
}); //ejecutamos la funcion que conecta la base, cuando estado de la conexion sea: "abierta" -> se muestra por consola el mensaje

// NU5nRbNCMZ5qxCBk;
// mauriquiroga97;
module.exports = connectDB;
