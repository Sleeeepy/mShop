'use strict';

angular.module('mShopApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/checkout', {
        templateUrl: 'app/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
          cart: function($q, MoltinAuth) {
            var deferred = $q.defer();
            MoltinAuth.then(function(moltin) {
              moltin.Cart.Contents(function(cart) {
                deferred.resolve(cart);
              });
            })
            return deferred.promise;
          },
          options: function($q, MoltinAuth) {
            var deferred = $q.defer();
            MoltinAuth.then(function(moltin) {
              moltin.Cart.Checkout(function(options) {
                deferred.resolve(options);
              });
            })
            return deferred.promise;
          },
          fields: function($q, MoltinAuth) {
            var deferred = $q.defer();
            MoltinAuth.then(function(moltin) {
              moltin.Address.Fields(null, null, function(fields) {
                deferred.resolve(fields);
              });
            })
            return deferred.promise;
          },
          moltin: function(MoltinAuth) {
            return MoltinAuth;
          }
        }










      });
  });
