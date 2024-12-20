const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev")); // morgan es para que nos muestre por consola las peticiones HTTP que se hacen a nuestra app
app.use(cors()); //CORS es útil para permitir que la aplicación sea accedida desde diferentes origenes, esto lo podemos omitir si se configura los permisos de acceso
app.use(bodyParser.json()); //body-parser es útil porque la app necesita analizar los cuerpos de las solicitudes HTTP entrantes, que generalmente se envían datos en formato JSON. Cuando se recibe una solicitud HTTP con un cuerpo, body-parser lo analiza y lo convierte en un objeto JavaScript accesible a través de req.body.
// Por ejemplo, si recibe una solicitud POST con un cuerpo JSON { "nombre": "Juan", "edad": 30 }, body-parser lo analiza y podemos acceder a estos datos mediante req.body.nombre y req.body.edad.
app.use(cookieParser()); //transforma las cookies en json

// en la carpeta routes manejamos las distintas rutas dentro del backend,
const homeRoute = require("./src/routes/homeRoute");
app.use("/", homeRoute); //http://localhost:2024"/"

const authRoutes = require("./src/routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./src/routes/user.routes");
app.use("/user", userRoutes);

const accountRoutes = require("./src/routes/account.routes");
app.use("/account", accountRoutes);

module.exports = { app }; // esta app es usada en el server, se importa usando la desestructurracion{}
