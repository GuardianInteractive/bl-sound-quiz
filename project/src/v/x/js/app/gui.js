/**
 *
 */
define(['jquery', '_', 'data/data', 'js/app/rounds', 'js/app/audio', 'js/app/game'], function($, _, Data, Rounds,  Audio, Game) {
    'use strict';

    var _$el = null;
    var _$sound = null;
    var _$score = null;
    var _$question = null;
    var _$roundCount = null;
    var _$currentRound = null;

    function _setSound() {
        _$sound.bind('click', Audio.playSound);
    }

    function createQuestion() {
        var roundData = Rounds.getQuestion();
        var template =  _.template(Data.question, {
            'question':    roundData.question,
            'answerText1': roundData.options[0],
            'answerText2': roundData.options[1],
            'answerText3': roundData.options[2]
        });

        _$question.html(template);

        _.each(roundData.options, function(option, index) {
            _$question.find('.GI_BLG_answer' + (index + 1)).bind(
                'click',
                (roundData.answer === index) ? Game.correctAnswer : Game.wrongAnswer
            );
        });
    }

    function updateRoundCount() {
        _$currentRound.html(Rounds.getCurrentRoundCount());
    }


    function _updateScore() {
        _$score.html(Game.getScore());
    }

    function showAnswer() {
        _updateScore();
        // show answer screen with next button
    }

    function setup(el) {
        _$el = $(el);
        _$el.html(Data.scaffolding);
        _$el.append(Data.audio);

        _$question = _$el.find('.GI_BLG_question_wrapper');
        _$sound = _$el.find('.GL_BL_play_btn');
        _$score = _$el.find('.GI_BL_score_value');
        _$roundCount = _$el.find('.GI_BL_total_rounds');
        _$currentRound = _$el.find('.GI_BL_round_count');
        _$roundCount.html(Rounds.getRoundCount());

        setupRound();
    }

    function setupRound() {
        _setSound();
        _updateScore();
        updateRoundCount();
        createQuestion();
    }

    return {
        setup: setup,
        createQuestion: createQuestion,
        showAnswer: showAnswer
    };
});
