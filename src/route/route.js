const express = require("express");
const router = express.Router();

const studentController = require("../controller/studentController.js");

router.post("/StdData", studentController.stdProfile);
router.post("/stdLogin", studentController.loginStudent);
router.get("/stdDetails", studentController.getStudent);

module.exports = router;
