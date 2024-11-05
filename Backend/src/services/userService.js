const { getUserIdFromToken } = require("../config/jwtProvider");
const User = require("../models/user.model"); // importado desde model user
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
        cuit,
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
  async deleteUser(id) {
    try {
      const deleteUser = await User.findByIdAndDelete(id);
      return deleteUser;
    } catch (error) {
      throw new Error("Failed to delete user id: " + id);
    }
  },
  async updateUser(id, dataUpdate) {
    try {
      const userUpdated = await User.findByIdAndUpdate(id, dataUpdate, {
        new: true,
      });
      return userUpdated;
    } catch (error) {
      throw new Error("Failed to update user id: " + id);
    }
  },
};
