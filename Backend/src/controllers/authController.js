const { generateToken } = require("../config/jwtProvider");
const userService = require("../services/userService");

const bcrypt = require("bcrypt");

//cada funcion tiene una solicitud: req y una respuesta a esa solicitud: res

//cada solicitud tiene un body, en general se usa formato Json {"name":"Juan","edad":21}

const register = async (req, res) => {
  // res.send("usuario registrado");punto de inicio para probar la ruta
  try {
    const user = await userService.createUser(req.body);
    const jwtUser = generateToken(user._id);
    res.cookie("token", jwtUser); // esto lo podemos ver en header de la response "header", se setea el token en una cookie
    return res.status(201).send({
      message: "User register successfully",

      // id: user._id,
      // username: user.fullName,
      // email: user.email,
      // createdAt: user.createdAt,
      // updateAt: user.updateAt,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  // res.send("login");
  const { email, password, cuit } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    const isCuitMatch = cuit == user.cuit; //si el cuit recibido del front coincide con el de la db
    if (!isPasswordMatch) {
      return res.status(401).send({ message: "invalid password" });
    }
    if (!isCuitMatch) {
      return res.status(401).send({ message: "invalid cuit" });
    }
    // const jwt = generateToken(user._id)  jwt,;
    return res.status(200).send({ message: "login success", user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAll = async (req, res) => {
  // res.send("usuario registrado");
  try {
    const users = await userService.getAllUsers();
    // const jwt = generateToken(user._id);
    return res.status(201).send({ message: users });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getById = async (req, res) => {
  // res.send("usuario registrado");
  try {
    //podemos enviar datos o variables que necesitemos por la url o endpoint y se almacenan en los parametros-> params

    const { id } = req.params; // debe coincidir el nombre con como lo nombramos en la ruta urlbase/:"id"/:"color" (sin comillas) urlbase/223/azul
    // const id = req.params.id;

    const user = await userService.findUserById(id);
    // const jwt = generateToken(user._id);
    return res.status(201).send({ message: user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
module.exports = {
  register,
  login,
  getAll,
  getById,
};
