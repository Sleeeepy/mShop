'use strict';

angular.module('mShopApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          categories: function($q,MoltinAuth){
            var deferred = $q.defer();
            $q.when(MoltinAuth).then(function(moltin){
              moltin.Category.List(null,function(categories){
                deferred.resolve(categories);
              });
            })
            return deferred.promise;
          }
        }
      });
  });
