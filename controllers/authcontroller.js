const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generatetoken } = require("../utils/generatetoken");

module.exports.registeruser = async (req, res) => {
  try {
    let { email, fullname, password } = req.body;

    let user = await userModel.findOne();
    if (user) {
      return res.send("You already have account, please login");
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) return res.send(err.message);
          else {
            let user = await userModel.create({
              email,
              password: hash,
              fullname,
            });

            let token = generatetoken(user);
            res.cookie("token", token);
            res.send("User Created Successfully");
          }
        });
      });
    }
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginuser = async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user) {
    return res.send("You doesnt Have any Account");
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        let token = generatetoken(user);
        res.cookie("token", token); // store token in cookie
        return res.redirect("/shop"); // go to shop.ejs
      } else {
        return res.send("something is incorrect");
      }
    });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
