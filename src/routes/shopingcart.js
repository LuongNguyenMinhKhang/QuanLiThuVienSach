const express = require('express');
const router = express.Router();

const ShopingcartController = require('../controller/ShopingcartController');
router.get('/shopingcart', ShopingcartController.Shopingcart);
router.get('/', ShopingcartController.Shopingcart);

module.exports = router;
