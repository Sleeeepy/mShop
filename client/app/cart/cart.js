'use strict';

angular.module('mShopApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/cart', {
        templateUrl: 'app/cart/cart.html',
        controller: 'CartCtrl'
      });
  });
