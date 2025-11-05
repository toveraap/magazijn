const express =  require("express");
const router = express.Router();
const {getProducts, getProduct, updatedProduct, deleteProduct, createProduct, createUser, loginUser} = require('../controllers/product.controller');

router.get('/', getProducts);

router.get('/:id', getProduct);

router.put('/:id', updatedProduct);

router.delete('/:id', deleteProduct);

router.post('/', createProduct);

router.post('/register', createUser);

router.post('/login', loginUser);

module.exports =  router;