var connection = require("../config/connection.js");
var order = {
	createOrderHeader: (account_id, subtotal, grandtotal, interest, shipping_address_id) => {
		return new Promise ((resolve, reject) => {
			var q = `INSERT INTO  bridge_product_order_header (account_id, subtotal_amount, grand_total_amount, interest_amount, shipping_address_id)
					 VALUES (${account_id}, ${subtotal}, ${grandtotal}, ${interest}, ${shipping_address_id})`;
			connection.query(q, (err, result) =>{
				if (err) throw err;
				resolve(result);
			})
		})
	},
	createOrderDetails: (order_header_id, cart) => {
		return new Promise ((resolve, reject) => {
			var q = '';
			cart.forEach(v => {
				q += `INSERT INTO bridge_product_order_details (order_header_id, item_id, quantity)
					  VALUES (${order_header_id}, ${v.item_id}, ${v.quantity}); `
			})
			console.log(q);
			connection.query(q, (err, result) =>{
				if (err) throw err;
				resolve(result);
			})
		})
	},
	createMicropayment: (account_id, order_header_id, total_amount, date_start, date_finish) => {
		return new Promise ((resolve, reject) => {
			var q = `INSERT INTO bridge_micropayment (account_id, order_header_id, total_amount, date_start, date_finish)
					 VALUES (${account_id}, ${order_header_id}, ${total_amount}, '${date_start}', '${date_finish}');`;
			connection.query(q, (err, result) =>{
				if (err) throw err;
				resolve(result);
			})
		})
	},
	createRepayment: (micropayment_id, repayments) => {
		return new Promise ((resolve, reject) => {
			var q = '';
			repayments.forEach(v => {
				q += `INSERT INTO bridge_micropayment_repayment (micropayment_id, payment_date, principal_amount, interest_amount, payment_amount, ending_balance)
					  VALUES (${micropayment_id}, '${v.payment_date_sql}', ${v.principal}, ${v.interest}, ${v.payment_amount}, ${v.balance}); `
			})
			connection.query(q, (err, result) =>{
				if (err) throw err;
				resolve(result);
			})
		})
	}
}

module.exports = order;