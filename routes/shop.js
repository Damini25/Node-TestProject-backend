const express = require('express');
const router = express.Router();
const productController=require('../controllers/products')

router.get('/getProductsList', productController.getProducts);

module.exports = router;
