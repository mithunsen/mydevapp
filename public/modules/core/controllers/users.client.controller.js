'use strict';


angular.module('core').controller('UsersController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.page_header = 'Users Page';

		$scope.users = [
		  {name: 'test1', email: 'abcd@erty.com', status: 'applied', pro_views: '10', net_sales: '1000' },
		  {name: 'test2', email: 'test2@tyu.com', status: 'applied', pro_views: '0', net_sales: '1300'},
		  {name: 'test3', email: 'test3@ertyu.cin', status: 'member', pro_views: '5', net_sales: '5000'},
		  {name: 'test4', email: 'test4@yui.ch', status: 'member', pro_views: '6', net_sales: '900'},
		  {name: 'test5', email: 'test5@hu.km', status: 'applied', pro_views: '1', net_sales: '300'}
		];
	}
]);