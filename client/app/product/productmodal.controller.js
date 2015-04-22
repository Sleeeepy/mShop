'use strict';

angular.module('mShopApp')
  .controller('ProductModalCtrl', function ($scope,moltin,$rootScope,$timeout) {
    $scope.qty = 1;
    $scope.addStatus = null;



    $scope.addCart = function() {
      $scope.addStatus = 'Adding to cart...';
      // Insert(id, qty, modifiers/size, callback)
      moltin.Cart.Insert($scope.product.id, $scope.qty, null, function(cart) {
        $scope.addStatus = 'Success!';
        moltin.Cart.Contents(function(items) {
          $rootScope.cart = items;
          $rootScope.$apply();
        });
        $scope.$apply();
        $timeout(function() {
          $scope.addStatus = null;
        }, 1000);
      });
    };
  });
