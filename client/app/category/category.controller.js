'use strict';

angular.module('mShopApp')
  .controller('CategoryCtrl', function ($scope,MoltinAuth,products,category,$modal) {

    $scope.category = category;
    $scope.products = products;
    console.log(products[0]);

    $scope.sortOptions = [{
                            label:'NEW ARRIVALS',
                            reverse:true,
                            sortOrder:'created_at'
                          },
                          {
                            label:'PRICE LOW-HIGH',
                            reverse:false,
                            sortOrder:'price'
                          },
                          {
                            label:'PRICE HIGH-LOW',
                            reverse:true,
                            sortOrder:'price'
                          },
                          {
                            label:'RATING',
                            reverse:true,
                            sortOrder:'created_at'
                          }];

    var opened = false;
    $scope.open = function (product) {
      $scope.product = product;

      if(opened){return;}

      var modalInstance = $modal.open({
        templateUrl: 'app/product/productmodal.html',
        controller: 'ProductModalCtrl',
        windowClass: 'modal-product',
        backdrop: false,
        scope: $scope,
        resolve:{
          moltin: function(MoltinAuth){
            return MoltinAuth;
          }
        }
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
