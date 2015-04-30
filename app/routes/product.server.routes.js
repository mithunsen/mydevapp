'use strict';

module.exports = function(app) {
	// Root routing
	var product = require('../../app/controllers/product.server.controller');

	app.route('/addProduct').post(product.addProduct);
	app.route('/upload/image').post(product.postImage);
	app.route('/products').get(product.getProductList);
	app.route('/productByID/:productId').get(product.productByID);

	//app.param('memberId', product.productId);

};