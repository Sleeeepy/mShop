'use strict';

angular.module('mShopApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/product', {
        templateUrl: 'app/product/product.html',
        controller: 'ProductCtrl'
      });
  });
