const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/Product")
const cartRoutes = require("./routes/Cart")
mongoose.connect("mongodb://0.0.0.0:27017/ecommerce").then(() => {
  console.log("Database Connected");
});
app.use(express.json());
app.use(cors());
app.use("/api", userRoutes);

app.use("/", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api",productRoutes)
app.use("/api",cartRoutes)
app.listen(4101);
