const { generateAccessToken } = require("../config/jwtProvider");
const userService = require("../services/userService");

const bcrypt = require("bcrypt");

//cada funcion tiene una solicitud: req y una respuesta a esa solicitud: res

//cada solicitud tiene un body, en general se usa formato Json {"name":"Juan","edad":21}

const register = async (req, res) => {
  // res.send("usuario registrado");punto de inicio para probar la ruta
  try {
    const user = await userService.createUser(req.body);
    const jwtUser = generateAccessToken(user._id);
    res.cookie("token", jwtUser); // esto lo podemos ver en header de la response "header", se setea el token en una cookie
    return res.status(201).send({
      message: "User register successfully",

      id: user._id,
      username: user.fullName,
      rol: user.rol,
      email: user.email,
      createdAt: user.createdAt,
      updateAt: user.updateAt,
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
    const jwtUser = generateAccessToken(user._id);
    res.cookie("token", jwtUser);
    return res.status(201).send({
      message: "User login successfully",

      id: user._id,
      username: user.fullName,
      rol: user.rol,
      email: user.email,
      createdAt: user.createdAt,
      updateAt: user.updateAt,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).send({ message: "user logout" });
};

module.exports = {
  register,
  login,
  logout,
};
