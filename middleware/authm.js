const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../models/Admin");

module.exports = async function(req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");
  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "authorization denied!" });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(req.user);
    req.user = decoded.user;
    console.log(req.user);
    console.log(decoded.user);
    const admin = await Admin.findById(req.user.id);
    if (admin !== null) return next();
    else {
      return res.status(401).send("authorization denied!!!");
    }
  } catch (err) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
