var express = require('express');
var router  = express.Router();

var shop_controller = require('../controllers/shop_controller');
var order_controller = require('../controllers/order_controller');

router.get('/product_categories/:page', shop_controller.showProducts);
router.get('/product_categories/search/:itemSearch/:page', shop_controller.searchItem);
router.get('/product_categories/category/:categorySearch/:page', shop_controller.filterByCategory);
router.get('/product_categories/subcategory/:subCategorySearch/:page', shop_controller.filterBySubCategory);
router.get('/product_categories/:page/filter', shop_controller.filterByUserInput);
router.get('/product_details/:itemId', shop_controller.showProductDetail);
router.post('/success_checkout', shop_controller.successCheckout);
router.get('/order_display', shop_controller.displayOrder);
router.post('/add_address', shop_controller.addAddress);

router.post('/create_order_header', order_controller.create_order_header);
router.post('/create_order_details', order_controller.create_order_details);
router.post('/create_micropayment', order_controller.create_micropayment);
router.post('/create_repayment', order_controller.create_repayment);

module.exports = router;