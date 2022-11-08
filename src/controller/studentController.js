const studentModel = require("../model/studentModel");
const validator = require("../utils/validator");
const jwt = require("jsonwebtoken");

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

//login Student
const loginStudent = async function (req, res) {
  try {
    let data = req.body;

    if (!validator.isValidRequestBody(data)) {
      return res
        .status(400)
        .send({ status: false, message: "Plz enter some data." });
    }

    const { email, password } = data;

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

    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "Password is required." });
    }

    const matchStd = await studentModel.findOne({ email, password });
    if (!matchStd) {
      return res
        .status(404)
        .send({ status: false, message: " Email/Password is Not Matched" });
    }
    
    const token = jwt.sign(
        {
            userId: matchStd._id.toString(),
            Project: "student Profile",
            iat: new Date().getTime() / 1000 //(iat)Issued At- the time at which the JWT was issued.              
        },
        "This is my secret key",
        {
            expiresIn: "12000sec",
        });

        res.setHeader("x-student-key", token)
        return res.status(200).send({ status: true, message: "Student Logged in successfully", data: token, });
     
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { stdProfile ,loginStudent};
