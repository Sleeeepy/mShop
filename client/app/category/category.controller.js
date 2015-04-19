'use strict';

angular.module('mShopApp')
  .controller('CategoryCtrl', function ($scope,MoltinAuth) {
    console.log(MoltinAuth);
    $scope.message = 'Hello';
  });
