const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model("Admin", AdminSchema);
