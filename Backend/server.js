const { app } = require("./index"); // app express importada desde el index.js
const connectDB = require("./src/config/db"); // funcion que retorna la conexion
const PORT = 2024;

app.listen(PORT, () => {
  connectDB();
  console.log("server is runing at " + PORT);
});
