/**
 *
 */
define(['jquery', '_', 'data/data', 'js/app/rounds', 'js/app/audio', 'js/app/game'], function ($, _, Data, Rounds, Audio, Game) {
    'use strict';

    var CSS_PATH = '<%= projectUrl %><%= versionDir %>styles/min.css';
    var _$el = null;
    var _$sound = null;
    var _$score = null;
    var _$question = null;
    var _$roundCount = null;
    var _$currentRound = null;
    var _$roundWrapper = null;
    var _$answerWrapper = null;
    var _$endWrapper = null;
    var BUTTON_DELAY = 400;
    var TRANSITION_DELAY = 700;
    var _buttons = null;

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
        _buttons = [];

        _.each(roundData.options, function (option, index) {
            var btn = _$question.find('.GI_BL_answer' + (index + 1));
            _buttons.push(btn);

            if (roundData.answer === index) {
                btn.bind('click', function () { _correctAnswer(btn); });
            } else {
                btn.bind('click', function () { _wrongAnswer(btn); });
            }
        });
    }

    function _correctAnswer(elm) {
        _.each(_buttons, function (button) {
            button.off();
        });
        elm.addClass('correct');
        Game.correctAnswer();
        setTimeout(_nextQuestion, TRANSITION_DELAY);
    }

    function _wrongAnswer(elm) {
        elm.off();
        elm.addClass('wrong');
        setTimeout(function () {
            elm.removeClass('wrong');
            elm.addClass('disabled');
        }, BUTTON_DELAY);

        Game.wrongAnswer();
    }

    function _showAnswer() {
        _$roundWrapper.hide();
        var roundData = Rounds.getRound();
        _$answerWrapper.html(_.template(Data.answer, {
                imageURL: roundData.image,
                answer: roundData.description
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
        _updateScore();
        if (Rounds.isLastQuestion()) {
            // show answer screen.
            _showAnswer();
        } else {
            Rounds.nextQuestion();
            _createQuestion();
        }
    }

    function _nextRound() {
        Audio.stopSound();
        Rounds.nextRound();
        _$answerWrapper.hide();

        if (Rounds.isLastRound()) {
            _showResults();
        } else {
            _$roundWrapper.show();
            setupRound();
        }
    }

    function _showResults() {
        _$roundWrapper.hide();


        _$endWrapper.html(_.template(Data.end, {
            playerDescription: '**** GOOD LISTENER *****',
            score: Game.getScore(),
            possibleScore: Game.getMaxScore(),
            tracks: Rounds.getRounds()
        }));

        _.each(_$endWrapper.find('.GI_BL_circular_progress'), function(elm, index) {
            $(elm).bind('click', function() { Audio.playTrack(index, this); });
        });

        _$endWrapper.show();
    }

    function setup(el) {
        _$el = $(el);
        _$el.html(Data.scaffolding);
        _$el.append(Data.audio);

        var cssElm = $('<link>', {
            href: CSS_PATH,
            rel: 'stylesheet',
            type: 'text/css'
        });
        _$el.append(cssElm);

        _$question = _$el.find('.GI_BL_question_wrapper');
        _$sound = _$el.find('.GL_BL_play_btn');
        _$roundWrapper = _$el.find('.GI_BL_round_wrapper');
        _$answerWrapper = _$el.find('.GI_BL_answer_wrapper');
        _$endWrapper = _$el.find('.GI_BL_end_wrapper');
        _$score = _$el.find('.GI_BL_score_value');
        _$roundCount = _$el.find('.GI_BL_total_rounds');
        _$currentRound = _$el.find('.GI_BL_round_count');
        _$roundCount.html(Rounds.getRoundCount());

        // DEBUG
        _$el.find('.end').bind('click', _showResults);

        setupRound();
    }

    function setupRound() {
        $('.GL_BL_play_progress').bind('click', function() {
            Audio.setup(this);
            Audio.playSound();
        });
        _setSound();
        _updateScore();
        _createQuestion();
        _updateRoundCount();
    }

    return {
        setup: setup
    };
});
