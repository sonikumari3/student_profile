const express = require("express");
const router = express.Router();

const studentController = require("../controller/studentController.js");

router.post("/StdData", studentController.stdProfile);

module.exports = router;
