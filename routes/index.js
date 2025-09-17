const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isloggedin");
const productModel = require("../models/product-model"); // import product model
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  res.render("index", { error: [], loggedin: false });
});

router.get("/shop", isloggedin, async (req, res) => {
  try {
    let products = await productModel.find(); // fetch all products
    let success = req.flash("success");
    res.render("shop", { products }); // pass products to EJS
  } catch (err) {
    console.error(err);
    res.render("shop", { products: [], success }); // fallback if error
  }
});

router.get("/addtocart/:productid", isloggedin, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "added to cart");
    res.redirect("/shop");
  } catch (err) {
    console.error(err);
    res.render("shop", { products: [] }); // fallback if error
  }
});

router.get("/cart", isloggedin, async (req, res) => {
  try {
    let user = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");

    const bill =
      Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);

    res.render("cart", { user, bill }); // pass products to EJS
  } catch (err) {
    console.error(err);
    res.render("cart", { products: [] }); // fallback if error
  }
});

module.exports = router;
