const { Router } = require("express");
const router = Router();

router.get("", async (req, res) => {
  res.status(200).send({ message: "welcome to account client website" }); //localhost:2024
});
router.get("/1", async (req, res) => {
  res.status(200).send({ message: "entraste a la otra parte wachin" }); //localhost:2024/1
});
module.exports = router;
