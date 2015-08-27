angular.module('starter.services', [])

.factory('Chats', ['$http', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    title: 'Ben Sparrow',
    description: 'You on your way?',
    price: 200,
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    title: 'Max Lynx',
    price: 200,
    description: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }];

  return {
    all: function() {
      return $http.get('http://192.168.31.215:8000/api/projects',{});
    },
    remove: function(chat) {
      //chats.splice(chats.indexOf(chat), 1);
      return $http.get('http://10.148.228.83:8000/api/projects',{});

    },
    get: function(chatId) {
      // for (var i = 0; i < chats.length; i++) {
      //   if (chats[i].id === parseInt(chatId)) {
      //     return chats[i];
      //   }
      // }
      // return null;
      return $http.get('http://10.148.228.83:8000/api/projects',{});


    }
  };
}]);
