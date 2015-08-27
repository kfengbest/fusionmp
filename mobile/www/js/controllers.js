angular.module('starter.controllers', [])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


Chats.all().success(function(data){
    $scope.chats = data;
  });

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ProjectCreationController',['$scope','Chats','$state',function($scope,Chats,$state){

    $scope.project={};

    $scope.create=function(){
        Todo.create({content:$scope.project.title}).success(function(data){
            $state.go('tab.chats');
        });
    }


}]);
