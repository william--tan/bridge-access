var order = require("../models/order.js");
const express = require("express");
const url = require("url");
const router = express.Router();

exports.create_order_header = async (req, res) => {
	result = await order.createOrderHeader(1, req.body.subtotal, req.body.grandtotal, req.body.interest, req.body.shipping_address_id)
	res.send(result);
};

exports.create_order_details = async (req, res) => {
	//console.log(req.body);
	iid = req.body['cart_item_id[]'];
	qty = req.body['cart_quantity[]'];
	var cart = [];
	for (let i = 0; i < iid.length; i++)
	{
		cart.push({"item_id": iid[i], "quantity": qty[i]})
	}
	console.log(cart);
	result = await order.createOrderDetails(req.body.order_header_id, cart)
	res.send(result);
};

exports.create_micropayment = async (req, res) => {
	result = await order.createMicropayment(1, req.body.order_header_id, req.body.total_amount, req.body.date_start, req.body.date_finish);
	res.send(result);
};

exports.create_repayment = async (req, res) => {
	repayments = [];
	omi = req.body['micropayment_id'];
	pn = req.body['payment_no[]'];
	pd = req.body['payment_date_sql[]'];
	p = req.body['principal[]'];
	interest = req.body['interest[]'];
	pa = req.body['payment_amount[]'];
	b = req.body['balance[]'];

	if (typeof pn == "string")
		pn = [pn];
	if (typeof pd == "string")
		pd = [pd];
	if (typeof p == "string")
		p = [p];
	if (typeof pa == "string")
		pa = [pa];
	if (typeof b == "string")
		b = [b];
	if (typeof interest == "string")
		interest = [interest];


	for (let i = 0; i < pn.length; i++)
	{
		repayments.push({
			payment_no: pn[i],
			payment_date_sql: pd[i],
			principal: p[i],
			interest: interest[i],
			payment_amount: pa[i],
			balance: b[i]
		})
	}
	result = await order.createRepayment(req.body.micropayment_id, repayments);
	res.send(result);
};
