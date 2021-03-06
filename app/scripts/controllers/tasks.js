'use strict';

angular
  .module('bloc1App')
  .controller('TasksCtrl', [
        '$http',
        '$scope',
        '$location',
        '$timeout',
        'AuthenticationService',
        'DayLeftService',

        function($http, $scope, $location, $timeout, AuthenticationService, DayLeftService) {

          this.AuthenticationService = AuthenticationService;
          this.DayLeftService = DayLeftService;
          var self = this;

          $http
            .get('/userid')
            .success(function(data){

              $timeout(function(){
                data = data.substr(1, data.length - 2);
                $scope.user = data;
              });

            })
            .error(function(){
            });

          $scope.user = {};

          $http
            .get('/todos')
            .success(function(data) {
              
              $timeout(function(){

                $scope.todos = data;

                self.DayLeftService.convertDay($scope.todos);

              });
            
            })
            .error(function(){
            });

          $scope.todos = [];


          //86400000 = 1 day

          $scope.form = {};

          $scope.addToDo = function () {

            $http.post('/todos', $scope.form)
              .success(function(data){

                $timeout(function(){

                  $scope.todos.push(data);         

                  self.DayLeftService.convertDay($scope.todos);

                  $scope.form = {};

                });

            });
          };

          $scope.archiveToDo = function(todo) {
           
            $http.put('/todos', todo)
              .success(function(){
                todo.status = 'archive';
              })
              .error(function(data){
                console.log('error> ', data);
              });
          };

          $scope.logout = function(){

            AuthenticationService.logout().then(function(){
 
              $location.url('/');

            }, function(){

              $location.url('/');

            });

          };
    
    }]);