const express = require("express");
const router = express.Router();
const authm = require("../middleware/authm");
const Catagory = require("../models/Catagory");

//get all catagories

router.get("/api/catagory/all", async (req, res) => {
  try {
    const catagory = await Catagory.find();
    if (!catagory) {
      return res.status(404).json({ msg: "catagory not found" });
    }
    res.json(catagory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//create catagory
router.post("/api/catagory/create", authm, async (req, res) => {
  const { name } = req.body;
  try {
    const catagory = await new Catagory({ name });
    await catagory.save();
    res.json(catagory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//edit a catagory
router.put("/api/catagory/:id", authm, async (req, res) => {
  const { name } = req.body;
  const updatedName = {};
  if (name) {
    updatedName.name = name;
  }
  try {
    const catagory = await Catagory.findById(req.params.id);
    if (!catagory) {
      return res.status(404).json({ msg: "catagory not found" });
    }
    let catagoryNew = await Catagory.findByIdAndUpdate(
      req.params.id,
      { $set: updatedName },
      { new: true }
    );
    res.json(catagoryNew);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//delete a catagory
router.delete("/api/catagory/:id", authm, async (req, res) => {
  try {
    const catagory = await Catagory.findById(req.params.id);
    if (!catagory) {
      return res.status(404).json({ msg: "catagory not found" });
    }
    await catagory.remove();
    res.json({ msg: "catagory removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
