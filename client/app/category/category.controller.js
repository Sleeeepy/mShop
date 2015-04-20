'use strict';

angular.module('mShopApp')
  .controller('CategoryCtrl', function ($scope,MoltinAuth,products,category,$modal) {

    $scope.message = 'Hello';
    $scope.category = category;
    $scope.products = products;

    var opened = false;
    $scope.open = function (product) {
      $scope.product = product;

      if(opened){return}

      var modalInstance = $modal.open({
        templateUrl: 'app/product/productmodal.html',
        controller: 'ProductModalCtrl',
        windowClass: 'modal-product',
        backdrop: false,
        scope: $scope
      });
      opened=true;
      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
        opened = false;
      }, function () {
        opened = false;
      });
    };



  });
