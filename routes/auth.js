const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authm = require("../middleware/authm");
const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//load user and admin
router.get("/api/auth", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const admin = await Admin.findById(req.user.id).select("-password");
    if (admin) {
      return res.json(admin);
    }
    return res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
// login user
router.post("/api/auth", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) {
          throw err;
        } else {
          res.json({ token });
        }
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//get userby id
/*
router.get("/api/:userid", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
*/
//login admin

router.post("/api/secretadmin", async (req, res) => {
  const { code, password } = req.body;
  console.log(req.body.code);
  console.log(req.body);
  try {
    const admin = await Admin.findOne({ code });
    if (!admin) {
      return res.status(401).send("authorization denied");
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "invalid credentials" });
    }

    const payload = {
      user: {
        id: admin.id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 3600
      },
      (err, token) => {
        if (err) {
          throw err;
        } else {
          res.json({ token });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

module.exports = router;
