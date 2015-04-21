'use strict';

angular.module('mShopApp')
  .controller('ProductModalCtrl', function ($scope,moltin,$rootScope) {
    $scope.qty = 1;
    $scope.addStatus;

    $scope.addCart = function(){
      moltin.Cart.Insert($scope.product.id,$scope.qty,null, function(){
        alert($scope.product+' added to basket');
        console.log(moltin.Cart.Contents());

      });
    };
  });
