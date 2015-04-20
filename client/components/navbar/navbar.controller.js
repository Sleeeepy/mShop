'use strict';

angular.module('mShopApp')
  .controller('NavbarCtrl', function ($scope, $location,$q,$modal, Auth,MoltinAuth) {

    $scope.moltin = MoltinAuth;
    $scope.getTree = function(category,cb){
      MoltinAuth.then(function(moltin){
        console.log('moltin',category.id);
        moltin.Category.Tree({parent:category.id},function(tree){
          cb(tree);

        });
      });

    };


    $scope.openModal = function(category){
      //$scope.getTree(category,function(tree){
        //console.log('tree',tree);
      //});
      $scope.open(category);
    };

  $scope.extraDlgClass = undefined;

  $scope.width = "100%";
  $scope.height = "200px";
  $scope.maxWidth = undefined;
  $scope.maxHeight = undefined;
  $scope.minWidth = undefined;
  $scope.minHeight = undefined;
  var opened = false;

  $scope.open = function (category) {

    if(opened){return}

    var modalInstance = $modal.open({
      templateUrl: 'components/navbar/navmodal.html',
      controller: 'NavModalCtrl',
      windowClass: 'modal-nav',//'app-modal-window',
      backdrop: false,
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
        },

          tree: function($q,MoltinAuth){
            var deferred = $q.defer();
            $q.when(MoltinAuth).then(function(moltin){
              moltin.Category.Tree(null,function(tree){
                deferred.resolve(tree);
              });
            })
            return deferred.promise;
          }
      }
    });
    opened=true;
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      opened = false;
    }, function () {
      opened = false;
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



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
