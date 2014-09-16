/*jslint browser:true*/
/*global angular*/
(function () {
  "use strict";

  angular.module('inslt.services')

    .factory('Commands', ['IO', 'FileSystem', 'AppAudio',
      function (IO, FileSystem, AppAudio) {
        var self = {};

        self.hi = function (args) {
          switch (args[0]) {
          case '-h':
            return [
              'Says hi in a polite manner',
              IO.format.b('Usage:'),
              IO.format.tabs(IO.format.cyan(' hi ' + IO.format.yellow('name')))
            ];
          default:
            return ['Hello there, ' + (args[0] || 'user') + '!'];
          }
        };

        self.date = function (args) {
          switch (args[0]) {
          case '-h':
            return [
              'Tells the current date',
              IO.format.b('Usage:'),
              IO.format.tabs(IO.format.cyan('date'))
            ];
          default:
            return [Date()];
          }
        };

        self.list = function (args) {
          var i,
            out = [
              'Available programs: ',
              'Type ' + IO.format.cyan('program') + IO.format.yellow(' -h') + ' for instructions'
            ];

          for (i in self) {
            if (self.hasOwnProperty(i)) {
              out.push(IO.format.tabs(IO.format.cyan(i)));
            }
          }

          return out;
        };

        self.ls = function (args) {
          var curFolder = FileSystem.curFolder,
            out = ['Listing ' + IO.format.cyan(curFolder.name)],
            i;
          switch (args[0]) {
          case '-h':
            return [
              'List current folder contents',
              IO.format.b('Usage:'),
              IO.format.tabs(IO.format.cyan('ls'))
            ];
          default:
            out.push(IO.format.tabs('.'));
            out.push(IO.format.tabs('..'));
            for (i = 0; i < curFolder.contents.length; i += 1) {
              out.push(IO.format.tabs(curFolder.contents[i].name));
            }

            return out;
          }
        };

        self.cd = function (aargs) {
          var curFolder = FileSystem.curFolder,
            args = aargs || '',
            folder = args[0],
            i;

          switch (folder) {
          case undefined:
          case '-h':
            return [
              'Change current folder',
              IO.format.b('Usage:'),
              IO.format.tabs(IO.format.cyan('cd') + IO.format.yellow(' folder-name'))
            ];
          case '.':
            return ['Current folder: ' + IO.format.cyan(FileSystem.getPathAsString())];
          case '..':
            FileSystem.goToParent();
            return ['Current folder: ' + IO.format.cyan(FileSystem.getPathAsString())];
          default:
            if (FileSystem.goTo(FileSystem.curPath.concat(folder))) {
              return ['Current folder: ' + IO.format.cyan(FileSystem.getPathAsString())];
            }
          }
          return [false, 'Can\'t find folder ' + IO.format.magenta(folder)];
        };

        self.mkdir = function (aargs) {
          var curFolder = FileSystem.curFolder,
            args = aargs || '',
            folder = args[0],
            i;

          if (typeof folder === 'string' && folder !== '-h') {
            if (FileSystem.isNameTaken(folder)) {
              return [false, 'File ' + IO.format.red(folder) + ' already exists'];
            }

            if (folder.length > 20) {
              return [false, 'Name ' + IO.format.red(folder) + ' is too long. Max length is 20 characters'];
            }

            FileSystem.curFolder.contents.push({
              name: folder,
              type: 'folder',
              contents: []
            });


            return ['Folder ' + IO.format.cyan(folder) + ' created'];
          }

          return [
            'Creates a folder',
            'Usage:',
            IO.format.tabs(IO.format.cyan('mkdir ')) + IO.format.yellow('foldername')
          ];
        };

        self.read = function (args) {
          var curFolder = FileSystem.curFolder,
            go = function () {
              var filename = args[0],
                curFile = {},
                i;

              for (i = 0; i < curFolder.contents.length; i += 1) {
                if (curFolder.contents[i].name === filename) {
                  curFile = curFolder.contents[i];

                  if (curFile.type === 'file') {

                    return [
                      IO.format.cyan(curFile.name + ' -----------------------------------------------'),
                      '',
                      curFile.contents,
                      '',
                      IO.format.cyan(curFile.name + ' -----------------------------------------------')
                    ];
                  } else {
                    return [false, IO.format.red('Can\'t read a folder')];
                  }
                }
              }
              return [false, 'File ' + IO.format.red(filename) + ' not found.'];
            };
          switch (args[0]) {
          case undefined:
          case '-h':
            return [
              'Reads a file',
              'Usage:',
              IO.format.cyan(IO.format.tabs('read') + IO.format.i(IO.format.yellow(' filename')))
            ];
          default:
            return go();
          }
        };

        self.help = function (args) {
          return [
            IO.format.big('Command Line Interface for ' + IO.format.i('dummies')),
            'Generic program usage:',
            IO.format.tabs(IO.format.cyan('program') + IO.format.yellow(' options')),
            '',
            'Ex.: ',
            IO.format.tabs(IO.format.cyan('hi')),
            IO.format.tabs(IO.format.cyan('hi') + ' ' + IO.format.yellow('John'))
          ];
        };

        self.login = function (args) {
          var go = function () {
            var username = args[0],
              password = args[1];

            return [false, IO.format.red('Login failed'), '<b>Don\'t have a username?</b> Try ' + IO.format.cyan('createusr -h')];
          };
          switch (args[0]) {
          case undefined:
          case '-h':
            return ['<b>Usage:</b> login <i>username</i> <i>password</i>'];
          default:
            return go();
          }
        };

        self.exit = function (args) {
          if (args[0] === '-h') {
            return [
              'Exits this terminal',
              IO.format.tabs(IO.format.cyan('exit'))
            ];
          }
          setTimeout(function () {
            history.back();
          }, 1000);
          return [IO.format.b('Good bye!')];
        };

        return self;
      }]);

}());
