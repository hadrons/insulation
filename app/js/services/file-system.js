/*jslint browser:true*/
/*global angular*/
(function () {
  "use strict";

  angular.module('inslt.services')

    .factory('FileSystem', function () {
      var self = {};

      self.files = [
        {
          type: 'folder',
          name: 'trmnl' + Math.floor(Math.random() * 100) + ': home',
          contents: [
            {
              name: 'log',
              type: 'folder',
              contents: [
                {
                  name: 'android',
                  type: 'folder',
                  contents: []
                },
                {
                  type: 'file',
                  name: 'log0',
                  contents: ''
                },
                {
                  type: 'file',
                  name: 'log1',
                  contents: ''
                },
                {
                  type: 'file',
                  name: 'log2',
                  contents: ''
                },
                {
                  type: 'file',
                  name: 'log3',
                  contents: ''
                }
              ]
            },
            {
              type: 'file',
              name: 'readme.txt',
              contents: 'Wow, I actually don\'t believe you got here...'
            },
            {
              type: 'file',
              name: 'empty.txt',
              contents: ''
            }
          ]
        }
      ];

      self.goTo = function (path) {
        var i = 1,
          curFolder = self.files[0],
          navigate = function (folderName) {
            var i;
            for (i = 0; i < curFolder.contents.length; i += 1) {
              if (curFolder.contents[i].name === folderName && curFolder.contents[i].type === 'folder') {
                curFolder = curFolder.contents[i];
                return true;
              }
            }
            return false;
          };

        for (i = 0; i < path.length; i += 1) {
          if (!navigate(path[i])) {
            return false;
          }
        }

        self.curFolder = curFolder;
        self.curPath = path;

        return true;
      };

      self.goToParent = function () {
        var path = self.curPath.length > 1 ? self.curPath.slice(0, -1) : self.curPath;

        return self.goTo(path);
      };

      self.getPathAsString = function () {
        return self.curPath.join('/');
      };


      self.isNameTaken = function (name) {
        var curContent = self.curFolder.contents,
          i;

        for (i = curContent.length - 1; i >= 0; i -= 1) {
          if (curContent[i].name === name) {
            return true;
          }
        }
        return false;
      };

      self.curFolder = self.files[0];
      self.curPath = [self.curFolder.name];

      return self;
    });

}());
