const mongoose = require("mongoose");

const CatagorySchema = new mongoose.Schema(
  {
    name: {
      type: String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Catagory", CatagorySchema);
