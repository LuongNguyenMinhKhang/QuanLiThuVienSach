const express = require('express');
const router = express.Router();
const ShopingcartController = require('../controller/ShopingcartController');

// Route hiển thị giỏ hàng
router.get('/', ShopingcartController.Shopingcart);

// Route thêm sách vào giỏ hàng
router.post('/add', ShopingcartController.AddToCart);

// Route xóa sách khỏi giỏ hàng
router.post('/delete', ShopingcartController.DeleteFromCart);

module.exports = router;
