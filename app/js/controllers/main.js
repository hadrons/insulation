/*jslint browser:true*/
/*global angular*/
(function () {
  'use strict';

  var inslt = angular.module('inslt.controllers')

    .controller('MainCtrl', ['$scope', '$location', 'AppAudio', function ($scope, $location, AppAudio) {
      $scope.message = 'insulation';

      $scope.mainOptions = [
        { name: "open terminal", link: 'terminal'},
        { name: "options", link: 'options'},
        { name: "about", link: 'about'}
      ];

      $scope.options = { name: 'options' };
      $scope.about = { name: 'about'};

      $scope.goto = function (view) {
        AppAudio.playOneShot('positive');
        $location.path(view);
      };

      $scope.goback = function () {
        AppAudio.playOneShot('negative');
        history.back();
      };
    }]);

}());
