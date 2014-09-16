/*jslint browser:true*/
/*global angular*/
(function () {
  "use strict";

  angular.module('inslt.services')

    .factory('IO', ['Utils', 'AppAudio',
      function (Utils, AppAudio) {
        var self = {};

        self.out = function ($scope, lintedcmd, what) {
          var success = what[0],
            put = function () {
              if (what.length > 0) {
                $scope.output = $scope.output + '<div class="line">' + what.slice(0, 1) + '</div>';
                what = what.slice(1);
                put();
              } else {
                if (success === false) {
                  AppAudio.playOneShot('negative');
                } else {
                  AppAudio.playOneShot('positive');
                }
              }
            };

          what = [lintedcmd].concat((typeof what[0] === 'boolean' ? what.slice(1) : what));

          what.push('');
          put();
        };

        self.format = {};

        self.format.wrap = function (content, tag, aclass) {
          return '<' + tag + (aclass ? (' class="' + aclass + '"') : '') + '>' + content + '</' + tag + '>';
        };

        self.format.big = function (txt) {
          return self.format.wrap(txt, 'span', 'big');
        };

        self.format.i = function (txt) {
          return self.format.wrap(txt, 'i');
        };

        self.format.b = function (txt) {
          return self.format.wrap(txt, 'b');
        };

        self.format.u = function (txt) {
          return self.format.wrap(txt, 'u');
        };

        self.format.red = function (txt) {
          return self.format.wrap(txt, 'span', 'red');
        };

        self.format.yellow = function (txt) {
          return self.format.wrap(txt, 'span', 'yellow');
        };

        self.format.cyan = function (txt) {
          return self.format.wrap(txt, 'span', 'cyan');
        };

        self.format.green = function (txt) {
          return self.format.wrap(txt, 'span', 'green');
        };

        self.format.magenta = function (txt) {
          return self.format.wrap(txt, 'span', 'magenta');
        };

        self.format.gray = function (txt) {
          return self.format.wrap(txt, 'span', 'gray');
        };

        self.format.tabs = function (txt) {
          return '&nbsp;&nbsp;&nbsp;&nbsp;' + txt;
        };

        return self;
      }]);

}());
