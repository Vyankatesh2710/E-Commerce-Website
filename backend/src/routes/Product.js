const express = require("express");
const {
  createProduct,
  getProducts,
  updateProduct,
  getSingleProduct,
  getProductPhoto,
  productDelete,
} = require("../controller/Product");
const multer = require("multer");
const router = express.Router();
const formidable = require("express-formidable");

router.get("/product/getProducts", getProducts);
router.post("/poduct/create", formidable(), createProduct);
router.get("/product/getSingleProduct/:slug", getSingleProduct);
router.get("/product/getPhoto/:pid", getProductPhoto);
router.get("/product/delete/:pid", productDelete);
router.get("/product/update/:pid", updateProduct);
router.post("/product/filter", filterProduct);
router.get("/search", searchProduct);
module.exports = router;
