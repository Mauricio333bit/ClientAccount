const { Router } = require("express");
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");

const router = Router();

router.get("/all", authenticate, userController.getAllUsers);
router.get("/:id", authenticate, userController.getUserById);
router.delete("/:id", authenticate, userController.deleteUser);
router.put("/:id", authenticate, userController.updateUser);

module.exports = router;

// router.get("http...../user/:id/", authController.getById);
// //:localhost:2024/user/:id"
