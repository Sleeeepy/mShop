'use strict';

angular.module('mShopApp')
  .controller('NavModalCtrl', function ($scope, $location,$q,$modal, Auth,MoltinAuth,tree) {
    $scope.location = ['Clothing','Shirts'];
    $scope.tree =tree;




  });
