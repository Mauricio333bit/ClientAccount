const { getUserIdFromToken } = require("../config/jwtProvider");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
module.exports = {
  async createUser(userData) {
    try {
      let { fullName, email, password, rol, cuit } = userData; //desestructurar un objeto ->let fullName=userData.fullName
      const isUserExist = await User.findOne({ cuit: cuit });

      if (isUserExist) {
        throw new Error("User already exist whit cuit: " + cuit);
      }
      password = await bcrypt.hash(password, 8); //hashea la contraseña "emcrypta", el segundo parametro son los "salto" que da el algoritmo
      const user = await User.create({
        fullName,
        email: email,
        password: password,
        rol,
        cuit: cuit,
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async findUserById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("No user with this id: " + id);
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async findUserProfileByJwt(jwt) {
    try {
      const userId = getUserIdFromToken(jwt);
      const user = await this.findUserById(userId);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
