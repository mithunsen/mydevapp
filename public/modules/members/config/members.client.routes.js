'use strict';

// Setting up route
angular.module('members').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/members/views/home.client.view.html'
		});

		$stateProvider.
		state('invite', {
			url: '/invite',
			templateUrl: 'modules/members/views/invite.client.view.html'
		});

		$stateProvider.
		state('available_works', {
			url: '/available_works',
			templateUrl: 'modules/members/views/works.client.view.html'
		});
	}
]);