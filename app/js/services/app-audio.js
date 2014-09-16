/*jslint browser:true*/
/*global angular*/
(function () {
  "use strict";

  angular.module('inslt.services')

    .factory('AppAudio', function () {
      var self = {},
        type = 'mp3',
        keystrokes = [],
        audios = {},
        loadAudio = function (callback) {
          var a = {},
            audioName = {},
            i = 1;

          type = new window.Audio().canPlayType('audio/ogg').length > 0 ? 'mp3' : 'ogg';

          //load keystrokes
          for (i = 1; i <= 13; i += 1) {
            a = new window.Audio();
            a.src = 'audio/' + (i < 10 ? '0' : '') + i + '.' + type;
            keystrokes.push(a);
          }

          //load stuff
          audios.positive = 'positive';
          audios.negative = 'negative';

          for (i in audios) {
            if (audios.hasOwnProperty(i)) {
              a = new window.Audio();
              a.src = 'audio/' + audios[i] + '.' + type;
            }
          }
        };

      self.playOneShot = function (what) {
        try {
          var audio = new window.Audio();
          audio.src = 'audio/' + audios[what] + '.' + type;
          audio.play();
        } catch (e) {}
      };

      self.playRandomKey = function () {
        try {
          var audio = new window.Audio();
          audio.src = keystrokes[Math.floor(Math.random() * (keystrokes.length - 1))].src;
          audio.play();
        } catch (e) {}
      };


      loadAudio();

      return self;
    });

}());
