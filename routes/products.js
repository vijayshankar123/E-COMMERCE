const express = require("express");
const router = express.Router();
const authm = require("../middleware/authm");
const Product = require("../models/Products");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

//create a product
router.post("/api/product/create", authm, async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          msg: "image could not be uploaded"
        });
      }
      let product = await new Product(fields);
      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({ msg: "please upload less than 1mb" });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      await product.save();
      res.json(product);
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//update a product

router.put("/api/product/:id", authm, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          msg: "image could not be uploaded"
        });
      }
      let product = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: fields },
        { new: true }
      );
      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({ msg: "please upload less than 1mb" });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      await product.save();
      res.json(product);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//delete a product

router.delete("/api/product/:id", authm, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    //check user
    if (!product) {
      return res.status(404).send("product not found");
    }

    await product.remove();
    res.json({ msg: "product deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//query parameter sort order limit
router.get("/api/products", async (req, res) => {
  try {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "sold";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const products = await Product.find()
      .select("-photo")
      .populate("catagory")
      .sort([[sortBy, order]])
      .limit(limit);
    res.json(products);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ msg: "products not found" });
  }
});

//related products display
router.get("/api/products/related/:productId", async (req, res) => {
  try {
    var product = await Product.findById(req.params.productId);
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const products = await Product.find({
      _id: { $ne: req.params.productId },
      catagory: product.catagory
    })
      .limit(limit)
      .select("-photo")
      .populate("catagory", "_id name");

    res.json(products);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ msg: "products not found" });
  }
});

//product catagories

router.get("/api/products/catagories", async (req, res) => {
  try {
    const catagories = await Product.distinct("catagory", {});
    res.json(catagories);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//filtering

router.post("/api/products/by/search", async (req, res) => {
  try {
    let order = req.body.order ? req.body.order : "asc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
        if (key === "price") {
          // gte -  greater than price [0-10]
          // lte - less than
          findArgs[key] = {
            $gte: req.body.filters[key][0],
            $lte: req.body.filters[key][1]
          };
        } else {
          findArgs[key] = req.body.filters[key];
        }
      }
    }

    const products = await Product.find(findArgs)
      .select("-photo")
      .populate("catagory")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);
    res.json({ size: products.length, products });
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: "product not found" });
  }
});

//photo loading
router.get("/api/product/photo/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;

//searching products
router.get("/api/search", async (req, res) => {
  if (req.query.search) {
    try {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");

      const products = await Product.find({ name: regex })
        .select("-photo")
        .populate("catagory");
      res.json(products);
    } catch (err) {
      console.log(err.message);
      res.status(404).json({ msg: "products not found" });
    }
  }
});

function escapeRegex(search) {
  return search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//single product
router.get("/api/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("-photo");
    res.json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
