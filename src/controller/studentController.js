const studentModel = require("../model/studentModel");
const validator = require("../utils/validator");

const stdProfile = async function (req, res) {
  try {
    let data = req.body;

    if (!validator.isValidRequestBody(data)) {
      return res
        .status(400)
        .send({ status: false, message: "Plz enter some data." });
    }

    let { name, Class, rollNo, email, password } = data;

    // Validation for Name-----
    if (!validator.isValid(name)) {
      return res.status(400).send({ status: false, msg: "Name is required" });
    }

    if (!validator.isValidName.test(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz provide a valid Name" });
    }

    // Validation for Class-----
    if (!validator.isValid(Class)) {
      return res.status(400).send({ status: false, msg: "Class is required" });
    }

    // Validation for rollNumber-----
    if (!validator.isValid(rollNo)) {
      return res
        .status(400)
        .send({ status: false, msg: "RollNumber is required" });
    }

    let uniqueRollNo = await studentModel.findOne({ rollNo });
    if (uniqueRollNo) {
      return res
        .status(400)
        .send({ status: false, msg: "This RollNumber Already Exist" });
    }
    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Email is required." });
    }

    if (!validator.isValidEmail.test(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid a email " });
    }

    let duplicateEmail = await studentModel.findOne({ email });
    if (duplicateEmail) {
      return res
        .status(400)
        .send({ status: false, msg: "Email already exist" });
    }
    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "Password is required." });
    }

    let savedData = await studentModel.create(data);
    return res.status(201).send({ status: true, data: savedData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { stdProfile };
