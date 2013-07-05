define(['jquery', '_', 'Howl', '../data/data', 'app/questions'], function ($, _, Howl, Data, Questions) {
    'use strict';
    function doThing(el) {
        console.log('Hello', Data.buttons);
        var roundData = Questions.getRound(0);
        var sound = new Howl({
            urls: [
                roundData.audio.mp3,
                roundData.audio.ogg
            ]
        });

        $(el).append(_.template(Data.buttons, {
            'answerText1': 'Hello',
            'answerText2': '2',
            'answerText3': '3'
        }));
    }

    return {
        start: doThing
    };
});