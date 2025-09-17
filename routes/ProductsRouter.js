const express = require("express");
const router = express.Router();
const upload = require("../config/multer-confif");
const productmodel = require("../models/product-model");

router.post("/create", upload.single("image"), async (req, res) => {
  let { name, discount, bgcolor, panelcolor, textcolor, price } = req.body;

  let product = await productmodel.create({
    image: req.file.buffer,
    name,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
    price,
  });

  req.flash("success", "product created");
  res.redirect("/owners/admin");
});
module.exports = router;
