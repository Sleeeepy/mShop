'use strict';

angular.module('mShopApp')
  .controller('NavbarCtrl', function ($scope, $location,$q,$modal, Auth,MoltinAuth) {
    $scope.menu = [
      {'title': 'Home','link': '/'},
      {'title': 'Women','link': '/women'},
      {'title': 'Children','link': '/category'},
    ];

    $scope.openModal = function(category){
      $scope.open('lg');
    };

  $scope.extraDlgClass = undefined;

  $scope.width = "100%";
  $scope.height = "200px";
  $scope.maxWidth = undefined;
  $scope.maxHeight = undefined;
  $scope.minWidth = undefined;
  $scope.minHeight = undefined;


  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'components/navbar/navmodal.html',
      controller: 'NavModalCtrl',
      windowClass: 'app-modal-window',
      /*extraDlgClass: $scope.extraDlgClass,

      width: $scope.width,
      height: $scope.height,
      maxWidth: $scope.maxWidth,
      maxHeight: $scope.maxHeight,
      minWidth: $scope.minWidth,
      minHeight: $scope.minHeight,*/
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


    console.log($scope.menu);
    var getMainCategories = function(){
      var deferred = $q.defer();
      $q.when(MoltinAuth).then(function(moltin){
        moltin.Category.List(null,function(categories){
          var menu = []
          categories.forEach(function(cat){
            if(!cat.parent){
              menu.push(cat);
            }
          });
          deferred.resolve(menu);
        });
      })
      return deferred.promise;
    };

    getMainCategories().then(function(menu){
      $scope.menu = menu;
    });







    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
