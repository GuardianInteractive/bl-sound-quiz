/**
 *
 */
define(['jquery', '_', 'data/data', 'js/app/rounds', 'js/app/audio', 'js/app/game'], function($, _, Data, Rounds, Audio, Game) {
    'use strict';

    var _$el = null;
    var _$sound = null;
    var _$score = null;
    var _$question = null;
    var _$roundCount = null;
    var _$currentRound = null;
    var _$roundWrapper = null;
    var _$answerWrapper = null;
    var _$endWrapper = null;

    function _setSound() {
        _$sound.bind('click', Audio.playSound);
    }

    function _createQuestion() {
        var roundData = Rounds.getQuestion();
        var template =  _.template(Data.question, {
            'question':    roundData.question,
            'answerText1': roundData.options[0],
            'answerText2': roundData.options[1],
            'answerText3': roundData.options[2]
        });

        _$question.html(template);

        _.each(roundData.options, function(option, index) {
            var btn = _$question.find('.GI_BLG_answer' + (index + 1));

            if (roundData.answer === index) {
                btn.bind('click', function() { _correctAnswer(btn); });
            } else {
                btn.bind('click', function() { _wrongAnswer(btn); });
            }
        });
    }

    function _correctAnswer(elm) {
        elm.off();
        elm.addClass('correct');
        Game.correctAnswer();
        _nextQuestion();
    }

    function _wrongAnswer(elm) {
        elm.off();
        elm.addClass('wrong');
        Game.wrongAnswer();
    }

    function _showAnswer() {
        _$roundWrapper.hide();
        _$answerWrapper.html( _.template(Data.answer, {
                imageURL: '',
                answer: ''
            }));
        _$answerWrapper.find('.GI_BL_next').bind('click', _nextRound);
        _$answerWrapper.show();
    }

    function _updateRoundCount() {
        _$currentRound.html(Rounds.getCurrentRoundCount());
    }

    function _updateScore() {
        _$score.html(Game.getScore());
    }

    function _nextQuestion() {
        if (Rounds.isLastQuestion()) {
            // show answer screen.
            _showAnswer();
        } else {
            Rounds.nextQuestion();
            _updateScore();
            _createQuestion();
        }
    }

    function _nextRound() {
        _$answerWrapper.hide();
        Rounds.nextRound();

        if (Rounds.isLastRound()) {
            // show end screen
            _$endWrapper.html(_.template(Data.end, {}));
            _$endWrapper.show();
        } else {
            _$roundWrapper.show();
            setupRound();
        }
    }

    function setup(el) {
        _$el = $(el);
        _$el.html(Data.scaffolding);
        _$el.append(Data.audio);

        _$question = _$el.find('.GI_BLG_question_wrapper');
        _$sound = _$el.find('.GL_BL_play_btn');
        _$roundWrapper = _$el.find('.GI_BLG_round_wrapper');
        _$answerWrapper = _$el.find('.GI_BLG_answer_wrapper');
        _$endWrapper = _$el.find('.GI_BLG_end_wrapper');
        _$score = _$el.find('.GI_BL_score_value');
        _$roundCount = _$el.find('.GI_BL_total_rounds');
        _$currentRound = _$el.find('.GI_BL_round_count');
        _$roundCount.html(Rounds.getRoundCount());

        setupRound();
    }

    function setupRound() {
        _setSound();
        _updateScore();
        _createQuestion();
        _updateRoundCount();
    }

    return {
        setup: setup
        //showAnswer: showAnswer
    };
});
