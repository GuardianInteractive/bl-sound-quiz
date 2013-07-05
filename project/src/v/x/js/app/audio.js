/**
 * Created with IntelliJ IDEA.
 * User: andrew
 * Date: 05/07/13
 * Time: 17:54
 * To change this template use File | Settings | File Templates.
 */
define(['Howl', 'js/app/rounds'], function(Howl, Rounds) {
    'use strict';

    var roundData = Rounds.getRound();
    var _sound = new Howl({
        urls: [
            roundData.audio.mp3,
            roundData.audio.ogg
        ]
    });


    function playSound() {
        _sound.play();
    }

    return {
        playSound: playSound
    };
});
