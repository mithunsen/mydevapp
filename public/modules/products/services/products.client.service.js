'use strict';

angular.module('products').service('ProductSharedService', function($http) {
    this.getProductList = function(){
        return $http.get('/products');
    };

    this.getProductListByIds = function(ids){
    	return $http.post('/productsByIds',ids);
    };
});
