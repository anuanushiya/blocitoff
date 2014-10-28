"use strict";angular.module("bloc1App",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$httpProvider",function(a,b){a.when("/",{templateUrl:"views/AuthView.html",controller:"AuthCtrl"}).when("/tasks",{templateUrl:"views/tasks.html",controller:"TasksCtrl"}).otherwise({redirectTo:"/"});var c=["$rootScope","$q",function(a,b,c){function d(a){return a}function e(a){var d=a.status;return 401===d?(c.path="/",void window.alert("Wrong username and/or password.")):b.reject(a)}return function(a){return a.then(d,e)}}];b.responseInterceptors.push(c)}]).run(["$rootScope","$location","AuthenticationService",function(a,b,c){a.$on("$routeChangeStart",function(a,d){"/"===d.$$route.redirectTo||c.isAuthorized()||(a.preventDefault(),b.url("/"))})}]),angular.module("bloc1App").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("bloc1App").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("bloc1App").controller("AuthCtrl",["$scope","$http","$location","AuthenticationService",function(a,b,c,d){d.logout(),a.form={},a.register=function(b,e,f){d.register(b,e,f).then(function(){c.url("/"),a.message="Registered!  Sign in above"})},a.login=function(a,b){d.login(a,b).then(function(){c.url("/tasks")})}}]),angular.module("bloc1App").factory("AuthenticationService",["$log","$http",function(a,b){var c={},d=!1;return c.isAuthorized=function(){return d},c.login=function(c,e){var f;return a.debug("Login function"),f=b.post("/login",{username:c,password:e}),f.then(function(){d=!0}),f},c.register=function(c,e,f){var g;return a.debug("Register function"),g=b.post("/users",{username:c,email:e,password:f}),g.then(function(){d=!0}),g},c.logout=function(){var a;return a=b.post("/logout"),a.then(function(){d=!1},function(){d=!1}),a},c}]),angular.module("bloc1App").controller("TasksCtrl",["$http","$scope","$location","$timeout","AuthenticationService",function(a,b,c,d,e){a.get("/userid").success(function(a){d(function(){a=a.substr(1,a.length-2),b.user=a})}).error(function(){}),b.user={},a.get("/todos").success(function(a){d(function(){b.todos=a;for(var c=0;c<b.todos.length;c++){var d=new Date(b.todos[c].date),e=d.getTime();console.log(e),b.todos[c].date=e}})}).error(function(){}),b.todos=[],b.form={},b.addToDo=function(){console.log("add todo function"),a.post("/todos",b.form).success(function(a){console.log(a),d(function(){b.todos.push(a),console.log(b.data);for(var c=0;c<b.todos.length;c++){var d=new Date(b.todos[c].date),e=d.getTime();console.log(e),b.todos[c].date=e}b.form={}})})},b.archiveToDo=function(b){console.log("archive todo",b),a.put("/todos",b).success(function(){b.status="archive"}).error(function(a){console.log("error> ",a)})},b.logout=function(){e.logout().then(function(){c.url("/")},function(){c.url("/")})}}]),angular.module("bloc1App").filter("daysleftFilter",function(){return function(a){var b,c=Date.now();return 864e5>c-a?b=7:1728e5>c-a?b=6:2592e5>c-a?b=5:3456e5>c-a?b=4:432e6>c-a?b=3:5184e5>c-a?b=2:6048e5>c-a?b=1:6912e5>c-a&&(b=0),b}});