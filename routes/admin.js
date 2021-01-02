const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const router = express.Router();
const productController=require('../controllers/products');
const userController=require('../controllers/users');

// router.get('/addProduct', productController.addProductPage);
router.post('/addProduct',productController.onAddingProduct);
router.get('/getProduct/:id',productController.onGettingProductById);
router.delete('/deleteProduct/:id',productController.onDeletingProduct);

router.post('/addUser',userController.onAddingUser);
router.get('/getUser/:id',userController.onGettingUserById);
router.delete('/deleteUser/:id',userController.onDeletingUser);

module.exports = router;
