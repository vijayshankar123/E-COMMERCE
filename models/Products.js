const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    price: {
      type: Number
    },
    catagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catagory"
    },
    quantity: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    shipping: {
      type: Boolean
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
