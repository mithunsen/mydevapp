'use strict';

angular.module('products').controller('ProductController', ['$scope', '$rootScope', '$stateParams', '$location', 'MemberAuthService', '$http',
	function($scope, $rootScope, $stateParams, $location, MemberAuthService, $http) {
		$scope.authentication = MemberAuthService._data;

		$scope.checkAuthAdmin = function(){
			if(!MemberAuthService.isAdmin()){	//	redirect user to Homepage if not admin
				$location.path('/');
			}
		};

		$scope.submitProductForm = function(){
			if($scope.addProductFrm.$valid){
				$scope.add_product();
			}
		};

		$scope.add_product = function() {
			var go = true;
			$scope.error = {};

			if (typeof($scope.cred) === 'undefined') {
				$scope.cred = {};
			}

			console.log(JSON.stringify($scope.cred));

			var require_fields = ['artist', 'title', 'dimensions', 'medium', 'price', 'provenance'];

			for	(var i = 0; i < require_fields.length; i++) {
				var error_class = require_fields[i]+'_error';
				$scope[error_class] = '';

			    if(typeof($scope.cred[require_fields[i]]) === 'undefined' || $scope.cred[require_fields[i]] === ''){
			    	go = false;
			    	$scope.error[require_fields[i]] = true;
			    	$scope[error_class] = '_error';
			    	
			    	break;
			    }
			} 
			
			if(go){
				$http.post('/addProduct',$scope.cred).success(function(response) {
					$scope.status_class = 'alert-success';
					$scope.statusMsg = 'Product added successfully.';
					$scope.show_status = true;
				}).error(function(response) {
					$scope.status_class = 'alert-error alert-danger';
					$scope.statusMsg = 'Unable to add product.';
					$scope.show_status = true;
				});
			}
			
		};
		
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