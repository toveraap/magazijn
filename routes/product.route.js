const express =  require("express");
const Product = require('../models/product.model');
const router = express.Router();
const {getProducts, getProduct, updatedProduct, deleteProduct, createProduct} = require('../controllers/product.controller');

router.get('/', getProducts);

router.get('/:id', getProduct);

router.put('/:id', updatedProduct);

router.delete('/:id', deleteProduct);

router.post('/', createProduct);

module.exports =  router;