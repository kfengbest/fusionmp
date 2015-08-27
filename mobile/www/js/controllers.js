angular.module('starter.controllers', [])

.controller('ProjectsCtrl', function($scope, Projects) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


Projects.all().success(function(data){
    $scope.projects = data;
  });

  $scope.remove = function(chat) {
    Projects.remove(chat);
  };
})

.controller('ProjectDetailCtrl', function($scope, $stateParams, Projects) {
  Projects.get($stateParams.projectId).success(function(data){
    $scope.project = data;
  });
})

.controller('ProjectCreationController',['$scope','Projects','$state',function($scope,Projects,$state){

    $scope.project={};

    $scope.takePhoto = function(){
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL
      });
    };

    $scope.create=function(){
        Projects.create($scope.project).success(function(data){
            $state.go('projects');
        });
    };

    function onPhotoDataSuccess(imageData) {
      // // Uncomment to view the base64-encoded image data
       console.log(imageData);

    };

    
    function onFail(message) {
      //alert('Failed because: ' + message);
    };


}]);
