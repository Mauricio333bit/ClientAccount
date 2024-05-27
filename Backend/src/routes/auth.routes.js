const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");
// para probar como funciona la app con las rutas y sus metodos usamos thunder client->extension
router.post("/register", authController.register); //cuando se haga una peticion POST a "URLbase"/signup se ejecuta la funcion register del authcotroller

router.post("/login", authController.login);

module.exports = router; //
