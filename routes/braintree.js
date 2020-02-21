const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const braintree = require("braintree");
const config = require("config");

router.get("/api/braintree/gettoken", auth, async (req, res) => {
  try {
    const gateway = braintree.connect({
      environment: braintree.Environment.Sandbox,
      merchantId: config.get("MERCHANT_ID"),
      publicKey: config.get("PUBLIC_ID"),
      privateKey: config.get("PRIVATE_ID")
    });
    gateway.clientToken.generate({}, (err, token) => {
      if (err) {
        throw err;
      } else {
        res.send(token);
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.post("/api/braintree/payment", auth, async (req, res) => {
  try {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    //charge
    let newTransaction = gateway.transaction.sale(
      {
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      },
      (err, result) => {
        if (err) {
          throw err;
        } else {
          res.json(result);
        }
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
