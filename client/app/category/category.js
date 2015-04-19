'use strict';

angular.module('mShopApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/category', {
        templateUrl: 'app/category/category.html',
        controller: 'CategoryCtrl'
      });
  });
