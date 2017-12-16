var connection = require("../config/connection.js");
var address = {
	viewAll: (account_id) => {
		return new Promise ((resolve, reject) => {
			var q = `SELECT * FROM Address WHERE account_id = ${account_id}`;
			connection.query(q, (err, result) =>{
				if (err) throw err;
				resolve(result);
			})
		})
	},
	add: (account_id, name, address1, address2, city, zip) => {
		return new Promise ((resolve, reject) => {
			var q = `INSERT INTO Address (account_id, name, address1, address2, city, zip) 
			VALUES (1, "${name}", "${address1}", "${address2}", "${city}", ${zip});`;
			connection.query(q, (err, result) =>{
				if (err) throw err;
				resolve(result);
			})
		})
	}
}

module.exports = address;