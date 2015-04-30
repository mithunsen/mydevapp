'use strict';

angular.module('login').factory('MemberAuthService', function($http) {
	var _this = this;

    var AuthServiceObj = {
    	_data: {},

    	setAuth: function(result){
    		delete result.age;
    		delete result.interests;
    		delete result.password;
			delete result.net_sales;

    		_this._data = result;
    	},

    	getAuth: function(){
    		if(typeof(_this._data) === 'object' && JSON.stringify(_this._data) === '{}'){
    			return false;
    		}
    		else{
    			return _this._data;
    		}
    	},

    	isMember: function(){
    		if(typeof(_this._data) === 'object' && JSON.stringify(_this._data) !== '{}' && _this._data.status === 'member'){
    			return true;
    		}
    		else{
    			return false;
    		}
    	},

    	isAdmin: function(){
    		if(typeof(_this._data) === 'object' && JSON.stringify(_this._data) !== '{}' && _this._data.status === 'admin'){
    			return true;
    		}
    		else{
    			return false;
    		}
    	},

    	unsetAuth: function(){
    		_this._data = {};
    	}
    };

    return AuthServiceObj;
});
