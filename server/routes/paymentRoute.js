const express = require("express");
const { Status, Charges } = require("../controller/paymentController");
const router = express.Router();

router.post("/charge", Charges);

router.post("/status", Status);

module.exports = router;
