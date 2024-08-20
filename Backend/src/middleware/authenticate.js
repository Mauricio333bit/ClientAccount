const { getUserIdFromToken } = require("../config/jwtProvider");
const userService = require("../services/userService");
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token; //tomamos el token "almacenado" en el navegador

    if (!token) {
      return res.status(401).json({ msg: "No Token provided" });
    }

    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({ msg: "Invalid Token id :" + userId });
    }

    const userFound = await userService.findUserById(userId);

    req.user = userFound; //cargo el user a los datos de la solicitud para usarlo despues
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
  next(); // entonces cuando termine esto va hacia el proximo paso en la ruta donde se usa
};

module.exports = authenticate;
