'use strict';

angular.module('members').controller('AdminController', ['$scope', 'ProductSharedService', '$stateParams', '$location', 'MemberAuthService', '$http',
	function($scope, ProductSharedService, $stateParams, $location, MemberAuthService, $http) {

		if(!MemberAuthService.isAdmin()){	//	redirect user to Homepage if not admin
			$location.path('/');
		}

		$scope.authentication = MemberAuthService._data;

		$scope.page_header = 'About Tamiko Grey';
		$scope.show_status = false;

		$scope.getMembers = function() {
			// Get lists of all memeber from mongodb
			$http.get('/members').success(function(response) {
				$scope.users = response;

			}).error(function(response) {
				console.log('Error : '+response.message);
			});	
		};

		$scope.getSingleMember = function() {
			// get selected member details
			$scope.cred = {};
			$scope.title = 'Member Details';
			$scope.member = $stateParams.memberId;
			$scope.users = {};

			$http.get('/memberByID/'+$scope.member).success(function(response) {
				// Fetched member data from db
				var tmpUserData = response;

				//	Get product lists via service
				var promise = ProductSharedService.getProductList();
				promise.then(function(prod_response) {
					var tmpUserProdData = tmpUserData.product_assigned;
					var allProducts = prod_response.data;

					//	Get assigned products for the selected member
					for (var i = 0; i < allProducts.length; i++) {
						var pid = allProducts[i]._id;
						
						if(tmpUserProdData.indexOf(pid) >= 0){
							allProducts[i].checked = true;		//	mark those product already assigned to that member
						}
					}
					
			        $scope.productList = allProducts;
			    });
				// --------------------
				$scope.users = tmpUserData;
				$scope.cred.member_status = (tmpUserData.status === 'member') ? '1' : '0';

			}).error(function(response) {
				console.log('Error : '+response.message);
			});			
		};

		$scope.updateMember = function(){
			$scope.cred.product_assigned = [];
			// Update a specific member detail
			$scope.cred.memberid = $stateParams.memberId;
			$scope.cred.status = (Number($scope.cred.member_status) === 1) ? 'member' : 'applied';

			//	Get added product to current member [by admin]
			angular.forEach($scope.productList,function(product){
				if(product.available_products){
					$scope.cred.product_assigned.push(product.available_products);
				}
			});

			$http.post('/updateMember',$scope.cred).success(function(response) {
				$scope.status_class = 'alert-success';
				$scope.statusMsg = 'Selected member has been updated successfully.';
				$scope.show_status = true;
				//console.log('User Added..'+response);

			}).error(function(response) {
				$scope.status_class = 'alert-error alert-danger';
				$scope.statusMsg = 'Unable to update selected member.';
				$scope.show_status = true;
				//console.log('Error : '+response.message);
			});
			
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

		
	}
]);
