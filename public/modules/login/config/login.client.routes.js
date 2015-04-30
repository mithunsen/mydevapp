'use strict';

// Setting up route
angular.module('login').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('login', {
			url: '/login',
			templateUrl: 'modules/login/views/login.client.view.html'
		});
	}
]);