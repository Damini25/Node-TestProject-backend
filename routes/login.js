const express = require('express');
const router = express.Router();
const userController=require('../controllers/users');

// router.get('/addProduct', productController.addProductPage);
router.post('/login',userController.onLogin);
router.post('/signup',userController.onAddingMember);

module.exports = router;
