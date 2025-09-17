const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generatetoken } = require("../utils/generatetoken");
const {
  registeruser,
  loginuser,
  logout,
} = require("../controllers/authcontroller");

router.post("/register", registeruser);
router.post("/login", loginuser);
router.get("/logout", logout);
module.exports = router;
