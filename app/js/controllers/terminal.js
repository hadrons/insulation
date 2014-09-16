/*jslint browser:true*/
/*global angular,jQuery*/
(function ($) {
  'use strict';

  var inslt = angular.module('inslt.controllers'),
    commands = {},
    lines = [],
    curLine = 0;

  inslt.controller('TerminalCtrl', ['$scope', 'AppAudio', 'Commands', 'IO', 'FileSystem',
    function ($scope, AppAudio, Commands, IO, FileSystem) {
      var radix = '',
        updatePrompt = function () {
          radix = FileSystem.getPathAsString() + '$ ';
          $scope.input = radix;
        };

      $scope.output = '';
      $scope.message = 'terminal';

      radix = FileSystem.curPath + '$ ';

      $scope.getInput = function () {
        if ($scope.input.length <= radix.length) {
          $scope.input = radix;
        }
      };

      $scope.readMe = function () {
        var cmd = ($scope.input || '')
          .replace(radix, '')
          .replace(/(>|<|&)/g, '')
          .replace(/( )+/g, ' '),
          args,
          prog,
          lintedcmd = IO.format.gray(radix + cmd);

        lines.push(cmd);
        curLine += 1;

        if (cmd.replace(/\ +/, '').length > 0) {
          cmd = cmd.split(' ');
          prog = cmd[0];
          args = cmd.slice(1);

          if (typeof Commands[prog] === 'function') {
            // try {
            IO.out($scope, lintedcmd, Commands[prog](args));
            updatePrompt();
            // } catch (e) {
            //   AppAudio.playOneShot('negative');
            //   IO.out($scope, lintedcmd, [IO.format.red('Something weird happend'), '']);
            // }
          } else {
            AppAudio.playOneShot('negative');
            IO.out($scope, lintedcmd, ['Program ' + IO.format.red(prog) + ' not found', 'Try ' + IO.format.cyan('help'), '']);
          }
        }

        $scope.input = radix;
        AppAudio.playRandomKey();
      };

      $(function () {
        $('#display').on('click', function () {
          $('input').focus();
        });
        $('input').focus();
      });

      updatePrompt();

      IO.out($scope, '', [
        Date(),
        '',
        IO.format.big(IO.format.cyan('public terminal access')),
        '',
        'type ' + IO.format.cyan('help') + ' then press ' + IO.format.green('RETURN') + ' for help',
        'type ' + IO.format.cyan('list') + ' then press ' + IO.format.green('RETURN') + ' for available programs'
      ]);

    }]);

  inslt.directive('ngEnter', function () {
    return function ($scope, $element, $attrs) {
      $element.bind("keydown keypress", function ($event) {
        if ($event.which === 13) {
          $scope.$apply(function () {
            $scope.$eval($attrs.ngEnter);
          });

          $event.preventDefault();
        } else if ($event.which === 38) {
          // gotoPreviousLine();
          $event.preventDefault();
        } else if ($event.which === 40) {
          // gotoNextLine();
          $event.preventDefault();
        }
      });
    };
  });


}(jQuery));
