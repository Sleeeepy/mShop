'use strict';

angular.module('mShopApp')
  .factory('MoltinAuth', function ($q) {
    // Service logic
    // ...
    var deferred = $q.defer();
    var moltin = new Moltin({publicId: 'wBOCK3eJbiFWyMrusZ5gDPvQTs9aCSMJOw4KhS9s'});
    moltin.Authenticate(function() {
      deferred.resolve(moltin);
    });



    // Public API here
    return deferred.promise;
    /*return {
      someMethod: function () {
        return meaningOfLife;
      }
    };*/
  });
