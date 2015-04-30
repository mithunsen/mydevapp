'use strict';

angular.module('products').controller('AdminProductController', ['$scope', '$rootScope', '$stateParams', '$location', 'MemberAuthService', '$http',
	function($scope, $rootScope, $stateParams, $location, MemberAuthService, $http) {
		if(!MemberAuthService.isAdmin()){	//	redirect user to Homepage if not admin
			$location.path('/');
		}

		$scope.authentication = MemberAuthService._data;

		
		
		$scope.getProducts = function(){
			// Get lists of all product from mongodb
			$http.get('/products').success(function(response) {
				$scope.products = response;
			}).error(function(response) {
				console.log('Error : '+response.message);
			});
		};

		$scope.getSingleProduct = function(){
			$scope.productId = $stateParams.productId;

			$http.get('/productByID/'+$scope.productId).success(function(response) {
				$scope.product_detail = response;
			}).error(function(response) {
				console.log('Error : '+response.message);
			});
		};
	}
]);