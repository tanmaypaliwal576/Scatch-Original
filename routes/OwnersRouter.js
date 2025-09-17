const express = require("express");
const ownersModel = require("../models/owners-model");
const { route } = require("./UsersRouter");
const router = express.Router();

router.get("/", () => {
  res.send("hey");
});

router.post("/create", async (req, res) => {
  let owners = await ownersModel.find();
  if (owners.length > 0) {
    return res.send(503).send("you dont have permission to create a new one");
  }
  res.send("We can create owner");
});

router.get("/admin", (req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { success: "" });
});
module.exports = router;
