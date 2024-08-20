const userService = require("../services/userService");
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(201).send({ message: users });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getUserById = async (req, res) => {
  try {
    //podemos enviar datos o variables que necesitemos por la url o endpoint y se almacenan en los parametros-> params

    const { id } = req.params; // debe coincidir el nombre con como lo nombramos en la ruta urlbase/:"id"/:"color" (sin comillas) urlbase/223/azul
    // const id = req.params.id;

    const user = await userService.findUserById(id);

    return res.status(201).send({ message: user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getUserProfileHandler = async (req, res) => {
  try {
    const user = req.user;
    user.password = null;
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    if (error instanceof Error) res.status(400).json(error.message);
    else res.status(500).json("Server error");
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDeteleted = await userService.deleteUser(id);
    res
      .status(201)
      .json({ message: "Succesfully,user deleted: " + userDeteleted.fullName });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ msg: error.message, success: false });
    } else {
      res.status(500).json({ error: "internal error", success: false });
    }
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const dataUpdate = req.body;

    const userUpdated = await userService.updateUser(id, dataUpdate);

    res.status(201).send({ message: "Succesfully update", userUpdated });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ msg: error.message, success: false });
    } else {
      res.status(500).json({ error: "internal error", success: false });
    }
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserProfileHandler,
  deleteUser,
  updateUser,
};
