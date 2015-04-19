'use strict';

angular.module('mShopApp')
  .controller('MainCtrl', function ($scope, $http, socket,categories) {
    $scope.awesomeThings = [];
    $scope.mainCategories = [];
    categories.forEach(function(item){
      if(!item.parent&&item.images){
        $scope.mainCategories.push(item);
      }
    });


    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function(obj) {
      var newWidth = 600 + slides.length + 1;
      console.log(obj.description);
      slides.push({
        image: obj.images[0].url.http,
        height: '100px',
        text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
          ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
      });
    };
    for (var i=0; i<$scope.mainCategories.length; i++) {
      console.log(i);
      $scope.addSlide($scope.mainCategories[i]);
    }


    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
