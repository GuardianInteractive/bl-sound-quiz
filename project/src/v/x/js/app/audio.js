/**
 *
 *
 */
define(['Howl', 'js/app/rounds'], function(Howl, Rounds) {
    'use strict';
    var _sound = null;

    function updateSound() {
        var roundData = Rounds.getRound();
        _sound = new Howl({
            urls: [
                roundData.audio.mp3,
                roundData.audio.ogg
            ]
        });
    }

    function playSound() {
        _sound.play();
    }

    return {
        playSound: playSound,
        updateSound: updateSound
    };
});
