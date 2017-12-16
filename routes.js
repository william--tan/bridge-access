module.exports = function(app){
    // Our model controllers (rather than routes)
    var shop = require('./routes/shop');
    var cart = require('./routes/cart');

    app.use('/shop', shop);
    app.use('/cart', cart);
};