angular.module('starter.services', [])

.factory('Projects', ['$http', function($http) {
  // Might use a resource here that returns a JSON array

  var baseUrl = 'http://fusionmarketplace.autodesk.com:8000';

  return {
    all: function() {
      return $http.get(baseUrl + '/api/projects',{});
    },
    create: function(project) {
      
      console.log('create project', project);

      return $http.post(baseUrl + '/api/projects',project, {
          headers:{
              'Content-Type':'application/json'
          }
      });

    },
    get: function(projectId) {
      return $http.get(baseUrl + '/api/projects'+projectId,{});
    }
  };
}]);
