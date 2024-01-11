const express = require("express");
const { addItemToCart } = require("../controller/Cart");

const router = express.Router();

router.post("/cart/addtocart", addItemToCart);

module.exports = router;

