/*jslint browser:true*/
/*global angular*/
(function () {
  "use strict";

  angular.module('inslt.services')

    .factory('Utils', function () {
      var self = {};

      self.uid = function (asize) {
        var size = asize || 255,
          cha = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
          uniqid = '',
          i = 0;
        for (i = size - 1; i >= 0; i -= 1) {
          uniqid += cha[Math.round(Math.random() * (cha.length - 1))];
        }
        return uniqid;
      };

      return self;
    });

}());
