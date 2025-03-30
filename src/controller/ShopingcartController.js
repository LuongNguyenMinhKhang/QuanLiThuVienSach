class ShopingcartController {
    Shopingcart(req, res, next) {
        res.render('shopingcart');
    }
}

module.exports = new ShopingcartController();
