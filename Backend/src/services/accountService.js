const Account = require("../models/account.model");
const User = require("../models/user.model");
module.exports = {
  async createAccount(idOwner) {
    try {
      //desestructurar un objeto ->let fullName=userData.fullName
      const isUserExist = await User.findOne({ _id: idOwner });

      if (!isUserExist) {
        throw new Error("Owner for this id dont exist: " + idOwner);
      }

      const account = await Account.create({
        owner: idOwner,
      });
      return account;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async findAccountByOwnerEmail(email) {
    try {
      // Buscar al usuario por su correo electrónico
      const user = await User.findOne({ email: email });

      if (!user) {
        throw new Error(`User not found: ${email}`);
      }

      const account = await Account.find({ owner: user._id });

      if (!account) {
        throw new Error(
          `No account found for the user with the email:: ${email}`
        );
      }

      return account;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async findAccountByOwnerId(id) {
    try {
      const account = await Account.find({ owner: id });
      if (!account) {
        throw new Error("No exist account with this owner: " + id);
      }
      return account;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getAllAccounts() {
    try {
      const accounts = await Account.find();
      return accounts;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async deleteAccount(id) {
    try {
      const deleteAccount = await Account.findByIdAndDelete(id);
      return deleteAccount;
    } catch (error) {
      throw new Error("Failed to delete account with id: " + id);
    }
  },
};
