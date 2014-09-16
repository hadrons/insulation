/*jslint browser:true*/
/*global angular*/
(function () {
  "use strict";

  angular.module('inslt.services', []);
  angular.module('inslt.resources', []);
  angular.module('inslt.controllers', []);

  var inslt = angular.module('inslt', ['ngRoute', 'ngSanitize', 'ngAnimate', 'inslt.services', 'inslt.resources', 'inslt.controllers']);

  inslt.config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/home', {
          templateUrl: 'templates/home.html',
          controller: 'MainCtrl'
        }).
        when('/terminal', {
          templateUrl: 'templates/terminal.html',
          controller: 'TerminalCtrl'
        }).
        when('/options', {
          templateUrl: 'templates/options.html',
          controller: 'MainCtrl'
        }).
        when('/about', {
          templateUrl: 'templates/about.html',
          controller: 'MainCtrl'
        }).
        otherwise({
          redirectTo: '/home'
        });
    }]);
}());
