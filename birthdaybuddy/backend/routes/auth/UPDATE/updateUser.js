require("dotenv").config();

const { updateValidation, CheckValidation } = require("../Helpers/validators");

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../../../models/User");
const { verifyUser } = require("../../../middleware/verifyUser");

router.put("/", verifyUser, updateValidation, async (req, res) => {
  try {
    if (CheckValidation(req, res)) return null;

    const raiseInvalidUpdationError = (code = 400, message = "invalid Details!") => {
      return res.status(code).json({ error: message });
    };

    req.body.email = req.body.email.toLowerCase().trim();
    req.body.username = req.body.username.toLowerCase().trim();
    req.body.name = req.body.name.toLowerCase().trim();

    // Checking if the user exists
    let user = await User.findById(req.data.id);
    if (!user) return raiseInvalidUpdationError(404, "User doesn't exists!");

    // Hashing the password
    if (req.body.password !== '') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password + process.env.PEPPER, salt)
  }

    // Creating the user
    const userData = Object.entries(req.body).filter(([key, value]) => value !== '' && key !== 'password');
    console.log("userData", userData);
    if (req.body.password !== '') userData.password = hashedPassword;
    userData.birthdate = new Date(Date.parse(userData.birthdate)).toISOString().split('T')[0];
    
    console.log("userData", userData);
    user = await User.findByIdAndUpdate(req.data.id, userData, {new: true});

    res.send("User Updated Successfully!");

  } catch (error) {
    // Catching unwanted errors
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
