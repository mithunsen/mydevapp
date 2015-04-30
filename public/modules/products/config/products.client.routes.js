'use strict';

// Setting up route
angular.module('products').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('viewProduct', {
			url: '/products/:productId',
			templateUrl: 'modules/products/views/view-product.client.view.html'
		});
	}
]);