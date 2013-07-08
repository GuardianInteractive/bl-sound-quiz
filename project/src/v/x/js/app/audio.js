/**
 *
 *
 */
define(['Howl', 'js/app/rounds'], function(Howl, Rounds) {
    'use strict';
    var _sound = null;

    function updateSound() {
        if (_sound) {
            _sound.stop();
        }

        _sound = null;

        var roundData = Rounds.getRound();
        _sound = new Howl({
            urls: [
                roundData.audio.mp3,
                roundData.audio.ogg
            ]
        });
    }

    function playSound() {
        _sound.stop();
        _sound.play();
    }

    function stopSound() {
        _sound.stop();
    }

    return {
        playSound: playSound,
        stopSound: stopSound,
        updateSound: updateSound
    };
});
