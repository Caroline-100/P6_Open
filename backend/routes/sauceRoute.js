const authentification = require("../middleware/auth");
const DowloadImage = require("../middleware/multer-config");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const controllers = require("../controllers/sauceControllers");

router.get("/", controllers.AllSauce);
router.get("/:id", controllers.oneSauce);
router.post("/", authentification, DowloadImage, controllers.createSauce);
router.put("/:id", authentification, DowloadImage, controllers.updateSauce);
router.delete("/:id", authentification, controllers.deleteSauce);
router.post("/:id/like", authentification, controllers.likeSauce);

module.exports = router;
