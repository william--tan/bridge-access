var cart = require("../models/cart.js");
const express = require("express");
const url = require("url");
const router = express.Router();
var address = require("../models/address.js")

exports.viewCart = async (req, res) => {
	var obj = {cart_content: await cart.view(1),
			   cart_total: (await cart.total_cost(1))[0]}
	res.render("cart_display", obj);
	//res.json(obj)
};

exports.updateQuantity = async (req, res) => {
	//await cart.updateQuantity(req.query.cart_id, req.query.qty);
	console.log(req.body);
	let a = req.body['a[]'];
	let b = req.body['cid[]'];

	if (typeof a == "string")
		a = [a];
	if (typeof b == "string")
		b = [b];

	await cart.updateQuantity(b, a);
	res.redirect('/cart');
};

exports.deleteItem = async (req, res) => {
	await cart.delete(req.query.cart_id);
	res.redirect('/cart');
};

exports.insertItem = async (req, res) => {
	console.log("itemid="+req.body.item_id+" | qty="+req.body.qty);
	await cart.insert(1, req.body.item_id, req.body.qty)
	//res.redirect('/cart');
	res.sendStatus(200);
};

exports.createOrder = async (req, res) => {
	await cart.createOrder(1, req.body.subtotal, 
							  req.body.grandtotal, 
							  req.body["cart[]"], 
							  req.body["micropayment[]"],
							  req.body.shipping_address)
	res.sendStatus(200)
}

exports.clearCartPurchased = async (req, res) => {
	result = await cart.clearCartPurchased(1);
	res.send(result);
}
