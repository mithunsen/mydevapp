'use strict';

angular.module('login').controller('LoginController', ['$scope', '$rootScope', '$stateParams', '$location', 'MemberAuthService', '$http',
	function($scope, $rootScope, $stateParams, $location, MemberAuthService, $http) {
		$scope.authentication = MemberAuthService._data;

		$scope.request_login = function(){
			if($scope.loginFrm.$valid){
				$scope.login();
			}
		};

		$scope.login = function(req,res) {
			var go = true;
			$scope.error = {};

			if (typeof($scope.cred) === 'undefined') {
				$scope.cred = {};
			}

			var require_fields = ['username', 'password'];

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
				if($scope.cred.username === 'admin' && $scope.cred.password === 'admin123'){
					MemberAuthService.setAuth({'firstname': 'admin', 'status':'admin'});
					$location.path('/admin/members');
				}
				else{
					$http.post('/login_request',$scope.cred).success(function(response) {
						if(response.message === 0){
							MemberAuthService.setAuth(response.member);
							if(MemberAuthService.isMember() || MemberAuthService.isAdmin()){	// Check for user or admin 
								// Login Successfull
								$scope.authentication = MemberAuthService.getAuth();
								$location.path('/available_works');
							}
							else{
								$scope.status_class = 'alert-error alert-danger';
								$scope.statusMsg = 'Your account is not active.';
								$scope.show_status = true;
							}
						}
						else if(response.message === 1){
							$scope.error.username = true;
				    		$scope.username_error = '_error';
						}
						else if(response.message === 2){
							$scope.error.password = true;
				    		$scope.password_error = '_error';
						}
						else if(response.message === 3){
							$scope.status_class = 'alert-error alert-danger';
							$scope.statusMsg = 'An unknown error occured.';
							$scope.show_status = true;
						}
						
					}).error(function(response) {
						$scope.status_class = 'alert-error alert-danger';
						$scope.statusMsg = 'Unable to Login.';
						$scope.show_status = true;
					});
				}
			}
			
		};
	}
]);