const express = require("express");
const app = express();
const connectDB = require("./config/db");
const users = require("./routes/users");
const auth = require("./routes/auth");
const catagory = require("./routes/catagory");
const product = require("./routes/products");
const braintree = require("./routes/braintree");
//middleware
app.use(express.json({ extended: false }));

//DB
connectDB();

//routes
app.use(users);
app.use(auth);
app.use(catagory);
app.use(product);
app.use(braintree);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server has started on port " + port);
});
