/**
 * Created with IntelliJ IDEA.
 * User: andrew
 * Date: 04/07/13
 * Time: 15:47
 * To change this template use File | Settings | File Templates.
 */
define(['jquery', '_', 'data/data', 'js/app/rounds', 'js/app/game', 'js/app/audio'], function($, _, Data, Rounds, Game, Audio) {
    'use strict';
    var _$el = null;

    function setSound() {
        _$el.find('.GL_BL_play_btn').bind('click', Audio.playSound);
    }

    function createQuestion() {
        var roundData = Rounds.getQuestion();
        var template =  _.template(Data.question, {
            'question':    roundData.question,
            'answerText1': roundData.options[0],
            'answerText2': roundData.options[1],
            'answerText3': roundData.options[2]
        });

        _$el.append(template);

        // Bind button
        _.each(roundData.options, function(option, index) {
            _$el.find('.GI_BLG_answer' + (index+1)).bind(
                'click',
                (roundData.answer === index) ? Game.correctAnswer : Game.wrongAnswer
            );
        });
    }

    function setup(el) {
        _$el = $(el);
        _$el.append(Data.audio);
        setSound();
    }

    return {
        setup: setup,
        createQuestion: createQuestion
    };
});
