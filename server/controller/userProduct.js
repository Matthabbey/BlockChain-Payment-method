const Product = require('../models/product');

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json({ product });
        
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error ${error}` });
        console.log(error);
    }
};

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
  
    res.status(200).json({ products: products });
  };

module.exports = {createProduct, getAllProducts}