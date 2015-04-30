'use strict';

angular.module('members').controller('InviteController', ['$scope', 'ProductSharedService', '$location', '$stateParams', 'MemberAuthService', '$http',
	function($scope, ProductSharedService, $location, $stateParams, MemberAuthService, $http) {
		
		if(!MemberAuthService.isMember()){	//	redirect user to Homepage if not member
			$location.path('/');
		}

		$scope.authentication = MemberAuthService._data;

		$scope.page_header = 'About Tamiko Grey';
		$scope.show_status = false;

		$scope.inviteReq = function(){
			//	invite requested
			var go = true;
			$scope.error = {};

			if (typeof($scope.cred) === 'undefined') {
				$scope.cred = {};
			}

			var require_fields = ['firstname', 'lastname', 'email'];

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
				//	Get the related data from Towerdata API 
				var path = 'http://matainja.com/towerdataApiAccess/setRequest.php';
				var param = '?action=getAPIData&fname='+$scope.cred.firstname+'&lname='+$scope.cred.lastname+'&email='+$scope.cred.email;
				var url = path+param;

				$http.get(url).success(function(response) {
					if(typeof(response) === 'object' && JSON.stringify(response) !== '{}'){
						$scope.cred.status = 'applied';
						$scope.cred.pro_views = '10';
						$scope.cred.net_sales = '2000';
						$scope.cred.own_vs_rent = 'own';
						$scope.cred.interests = 'Fishing, Dog, Bananas';
						$scope.cred.gender = response.gender;
						$scope.cred.age = 25;

						//	 Let insert the member data into mongodb database
						//console.log('sending user data : '+JSON.stringify($scope.cred));

						$http.post('/addInvite',$scope.cred).success(function(response) {
							$scope.status_class = 'alert-success';
							$scope.statusMsg = 'Invitation has been sent successfully.';
							$scope.show_status = true;
							//console.log('User Added..'+response);

						}).error(function(response) {
							$scope.status_class = 'alert-error alert-danger';
							$scope.statusMsg = 'Unable to sent invitation. Please try again.';
							$scope.show_status = true;
							//console.log('Error : '+response.message);
						});

						
					}
					else{
						$scope.status_class = 'alert-error alert-danger';
						$scope.statusMsg = 'Invalid response from API.';
						$scope.show_status = true;
					}
				})
				.error(function(response) {
					console.log('Error : '+response.message);
				});				
			}
		};

		$scope.get_member_works = function(){
			$scope.cred = MemberAuthService.getAuth();
			var member_product_ids = '';
			var member_products = $scope.cred.product_assigned;

			for(var i=0; i<member_products.length;i++){
			  console.log(q[i]);
			}

			//	Get member product details
			/*
			$http.post('/get_member_product',$scope.cred).success(function(response) {
				

			}).error(function(response) {
				//console.log('Error : '+response.message);
			});
			*/

			//	Get product lists via service
			var promise = ProductSharedService.getProductList();
			promise.then(function(response) {
		        $scope.all_products = response.data;
		    });
		};
	}
]);
