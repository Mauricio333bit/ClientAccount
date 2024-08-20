const { Router } = require("express");
const accountController = require("../controllers/accountController");
const authenticate = require("../middleware/authenticate");
const router = Router();

router.post("/:id", accountController.createAccount);
router.get("", authenticate, accountController.getAllAccounts);
router.get("/:id", authenticate, accountController.getAccountByOwnerId);
router.get(
  "/email/:email",
  authenticate,
  accountController.getAccountByOwnerEmail
);
router.delete("/:id", authenticate, accountController.deleteAccount);

module.exports = router;
