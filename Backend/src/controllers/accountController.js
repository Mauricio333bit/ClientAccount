const accountService = require("../services/accountService");

const createAccount = async (req, res) => {
  try {
    const idOwner = req.user.id;
    const account = await accountService.createAccount(idOwner);
    res.status(200).send({ message: account });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await accountService.getAllAccounts();

    return res.status(201).send({ message: accounts, accounts });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getAccountByOwnerId = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await accountService.findAccountByOwnerId(id);

    return res.status(201).send({ message: account });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getAccountByOwnerEmail = async (req, res) => {
  try {
    const { email } = req.user.id;

    const account = await accountService.findAccountByOwnerEmail(email);

    return res.status(201).send({ message: account });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const accountDeteleted = await accountService.deleteAccount(id);
    res
      .status(201)
      .json({ message: "Succesfully,account deleted: " + accountDeteleted });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ msg: error.message, success: false });
    } else {
      res.status(500).json({ error: "internal error", success: false });
    }
  }
};

module.exports = {
  createAccount,
  getAllAccounts,
  getAccountByOwnerEmail,
  getAccountByOwnerId,
  deleteAccount,
};
