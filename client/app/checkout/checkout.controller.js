'use strict';

angular.module('mShopApp')
.controller('CheckoutCtrl', function ($scope, $rootScope, $location, moltin, cart, options, fields) {
    $scope.data = {bill: {}, ship: {}, ship_bill: 0, notes: '', shipping: '', gateway: ''}
    $scope.cart = cart;
    $scope.options = options;
    $scope.fields = fields;

    $scope.createOrder = function(data) {
      console.log($scope.data);
      moltin.Cart.Order({
        customer: '970203391613468674', //guest customer for now
        shipping: $scope.data.shipping,
        gateway: $scope.data.gateway,
        bill_to: $scope.data.bill,
        ship_to: $scope.data.ship_bill ? 'bill_to' : $scope.data.ship
      }, function(response) {
        console.log(response);
        $rootScope.order = response;
        $rootScope.$apply(function() {
          $location.path('/payment');
        });
      })
    };

  });
