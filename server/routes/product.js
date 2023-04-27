const express = require("express");
const router = express.Router();
// const { authenticateUser } = require("../middlewares/authentication")

const  {createProduct, getAllProducts}  = require("../controller/userProduct");

router.post("/product", createProduct);
router.get('/getall', getAllProducts)

module.exports = router;
