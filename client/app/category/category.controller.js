'use strict';

angular.module('mShopApp')
  .controller('CategoryCtrl', function ($scope,MoltinAuth,products,category) {
    console.log(category);
    $scope.message = 'Hello';
    $scope.category = category;
    $scope.products = products;
  });
