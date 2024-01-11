const Product = require("../models/Product");
const slugify = require("slugify");
const fs = require("fs");
const multer = require("multer");

exports.createProduct = async (req, resp) => {
  try {
    const { name, price, description, category, quantity } = req.body;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return resp.status(500).send({ error: "Name Is Required" });
      case !description:
        return resp.status(500).send({ error: "Description Is Required" });
      case !price:
        return resp.status(500).send({ error: "Price Is Required" });
      case !quantity:
        return resp.status(500).send({ error: "Quantity Is Required" });
      case !category:
        return resp.status(500).send({ error: "Category Is Required" });
      case !photo && photo.size > 10000:
        return resp
          .status(500)
          .send({ error: "Photo Is Required And Should Be Less Than 1MB" });
    }
    const product = new product({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    resp.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

exports.getProducts = async (req, resp) => {
  try {
    const product = await Product.find({})
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 })
      .populate("category");
    resp.status(200).send({
      success: true,
      total: product.length,
      message: "All Products",
      product,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

exports.getSingleProduct = async (req, resp) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    resp.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error getting single product",
      error,
    });
  }
};

exports.getProductPhoto = async (req, resp) => {
  try {
    const product = await Product.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      resp.set("Content-type", product.photo.contentType);
      return resp.status(200).send(product.photo.data);
    }
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error Getting Product Photo",
      error,
    });
  }
};

exports.productDelete = async (req, resp) => {
  try {
    await Product.findByIdAndDelete(req.params.pid).select("-photo");
    resp.status(200).send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error deleting product",
      error,
    });
  }
};

exports.updateProduct = async (req, resp) => {
  try {
    const { name, price, description, category, slug, quantity } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return resp.status(500).send({ error: "Name Is Required" });
      case !description:
        return resp.status(500).send({ error: "Description Is Required" });
      case !price:
        return resp.status(500).send({ error: "Price Is Required" });
      case !quantity:
        return resp.status(500).send({ error: "Quantity Is Required" });
      case !category:
        return resp.status(500).send({ error: "Category Is Required" });
      case !photo && photo.size > 10000:
        return resp
          .status(500)
          .send({ error: "Photo Is Required And Should Be Less Than 1MB" });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { name: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save(
      resp.status(201).send({
        success: true,
        message: "Product updated successfully",
        product,
      })
    );
  } catch (error) {
    resp.status(500).send({
      success: false,
      error,
      message: "Error in updating product",
    });
  }
};

exports.filterProduct = async (req, resp) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const fproducts = await Product.find(args);
    resp.status(200).send({
      success: true,
      fproducts,
    });
  } catch (error) {
    resp.status(400).send({
      success: false,
      message: "Error in filtering product",
      error,
    });
  }
};
exports.searchProduct = async (req, resp) => {
  try {
    const { keyword } = req.params;
    const result = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    resp.json(result);
  } catch (error) {
    resp.status(400).send({
      success: false,
      message: "Error in Searching product",
      error,
    });
  }
};
