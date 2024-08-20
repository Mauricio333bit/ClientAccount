const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");
const authenticate = require("../middleware/authenticate");

// para probar como funciona la app con las rutas y sus metodos usamos thunder client->extension/podriamos usar postman
router.post("/register", authController.register); //cuando se haga una peticion POST a "URLbase"/signup se ejecuta la funcion register del authcotroller
router.post("/login", authController.login);
router.post("/logout", authenticate, authController.logout);

module.exports = router; //
