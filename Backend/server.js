const { app } = require("./index"); // app express importada desde el index.js
const connectDB = require("./src/config/db"); // funcion que hace la conexion
const PORT = 2024;

app.listen(PORT, async () => {
  await connectDB(); // el await indica al navegador que espere que se resuelva la "funcion" para continuar
  console.log("server is runing at " + PORT);
});
