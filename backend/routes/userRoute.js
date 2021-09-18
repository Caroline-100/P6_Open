const express = require("express");
const router = express.Router();

const controllerUser = require("../controllers/userControllers");

const auth = require("../middleware/auth");
router.post("/signup", controllerUser.signup);
router.post("/login", auth, controllerUser.login);

module.exports = router;
