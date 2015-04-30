'use strict';

// Setting up route
angular.module('admin').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		$stateProvider.
		state('members', {
			url: '/admin/members',
			templateUrl: 'modules/admin/views/members.client.view.html'
		});

		$stateProvider.
		state('membersDetails', {
			url: '/admin/getmember/:memberId',
			templateUrl: 'modules/admin/views/view-member.client.view.html'
		});

		$stateProvider.
		state('addProducts', {
			url: '/admin/products/add',
			templateUrl: 'modules/admin/views/add-product.client.view.html'
		});
	}
]);