'use strict';

angular.module('mShopApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/category', {
        templateUrl: 'app/category/category.html',
        controller: 'CategoryCtrl'
      })
      .when('/category/:id', {
        templateUrl: 'app/category/category.html',
        controller: 'CategoryCtrl',
        resolve:{
          products: function($q,$route,MoltinAuth){
            var deferred = $q.defer();
            $q.when(MoltinAuth).then(function(moltin){
              moltin.Product.List({category:$route.current.params.id},function(products){
                deferred.resolve(products);
              });
            })
            return deferred.promise;
          },
          category: function($q,$route,MoltinAuth){
            var deferred = $q.defer();
            $q.when(MoltinAuth).then(function(moltin){
              moltin.Category.Get($route.current.params.id,function(category){
                deferred.resolve(category);

              });
            })
            return deferred.promise;
          }
        }

      });
  });
