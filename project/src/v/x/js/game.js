/**
 *
 */
define(['_', 'data/data', 'js/app/rounds', 'js/app/audio', 'js/app/game', 'animPoly'], function (_, Data, Rounds, Audio, Game) {
    'use strict';

    var CSS_PATH = '<%= projectUrl %><%= versionDir %>styles/min.css';
    var SOCIAL_GU_LINK = 'GU-SHORT-CODE';
    var _el = null;
    var _sound = null;
    var _score = null;
    var _question = null;
    var _roundCount = null;
    var _currentRound = null;
    var _roundWrapper = null;
    var _answerWrapper = null;
    var _endWrapper = null;
    var BUTTON_DELAY = 400;
    var TRANSITION_DELAY = 700;
    var _buttons = null;

    function _setSound() {
        _sound.addEventListener('click', Audio.playSound, false);
    }

    function _createQuestion() {
        var roundData = Rounds.getQuestion();
        var template =  _.template(Data.question, {
            'question':    roundData.question,
            'answerText1': roundData.options[0],
            'answerText2': roundData.options[1],
            'answerText3': roundData.options[2]
        });

        _question.innerHTML = template;
        _buttons = [];

        _.each(roundData.options, function (option, index) {
            var btn = _question.querySelector('.GI_BL_answer' + (index + 1));
            _buttons.push(btn);

            if (roundData.answer === index) {
                btn.addEventListener('click', _correctAnswer, false);
            } else {
                btn.addEventListener('click', _wrongAnswer, false);
            }
        });
    }

    function _correctAnswer(event) {
        var elm = event.target;
        _.each(_buttons, function (button) {
            button.removeEventListener('click', _correctAnswer, false);
            button.removeEventListener('click', _wrongAnswer, false);
        });
        elm.className += ' correct';
        Game.correctAnswer();
        setTimeout(_nextQuestion, TRANSITION_DELAY);
    }

    function _wrongAnswer(event) {
        var elm = event.target;
        elm.removeEventListener('click', _wrongAnswer, false);
        elm.className += (' wrong');
        setTimeout(function () {
            elm.className = elm.className.replace(' wrong', '');
            elm.className += ' disabled';
        }, BUTTON_DELAY);

        Game.wrongAnswer();
    }

    function _showAnswer() {
        _roundWrapper.style.display = 'none';
        var roundData = Rounds.getRound();
        _answerWrapper.innerHTML = _.template(Data.answer, {
                imageURL: roundData.image,
                answer: roundData.description
            });
        _answerWrapper.querySelector('.GI_BL_next').addEventListener('click', _nextRound, false);
        _answerWrapper.style.display = 'block';
    }

    function _updateRoundCount() {
        _currentRound.innerHTML = Rounds.getCurrentRoundCount();
    }

    function _updateScore() {
        _score.innerHTML = Game.getScore();
    }

    function _nextQuestion() {
        _updateScore();
        if (Rounds.isLastQuestion()) {
            _showAnswer();
        } else {
            Rounds.nextQuestion();
            _createQuestion();
        }
    }

    function _nextRound() {
        Audio.stopSound();
        Rounds.nextRound();
        _answerWrapper.style.display = 'none';

        if (Rounds.isLastRound()) {
            _showResults();
        } else {
            _roundWrapper.style.display = 'block';
            setupRound();
        }
    }

    function _showResults() {
        _roundWrapper.style.display = 'none';

        var playerDescriptions = [
            'Hmmm. Might be time to wash your ears out',
            'Hear hear! Your aural handiwork is sound',
            'Crikey. You can probably hear butterflies. Have you thought about becoming a piano tuner?'
        ];

        var usersDescriptionIndex = Math.round(
                (Game.getScore() / Game.getMaxScore()) * (playerDescriptions.length - 1)
            );

        _endWrapper.innerHTML = _.template(Data.end, {
            playerDescription: playerDescriptions[usersDescriptionIndex],
            score: Game.getScore(),
            possibleScore: Game.getMaxScore(),
            tracks: Rounds.getRounds(),
            url: encodeURIComponent(SOCIAL_GU_LINK)
        });

        _.each(_endWrapper.querySelectorAll('.GI_BL_circular_progress'), function (elm, index) {
            elm.addEventListener('click', function () { Audio.playTrack(index, this); }, false);
        });

        _endWrapper.style.display = 'block';
    }

    function setup(el) {
        _el = el;
        _el.innerHTML = Data.scaffolding;

        var cssElm = document.createElement('link');
        cssElm.setAttribute('href', CSS_PATH);
        cssElm.setAttribute('rel', 'stylesheet');
        cssElm.setAttribute('type', 'text/css');
        _el.appendChild(cssElm);

        _question = _el.querySelector('.GI_BL_question_wrapper');
        _sound = _el.querySelector('.GL_BL_play_btn');
        _roundWrapper = _el.querySelector('.GI_BL_round_wrapper');
        _answerWrapper = _el.querySelector('.GI_BL_answer_wrapper');
        _endWrapper = _el.querySelector('.GI_BL_end_wrapper');
        _score = _el.querySelector('.GI_BL_score_value');
        _roundCount = _el.querySelector('.GI_BL_total_rounds');
        _currentRound = _el.querySelector('.GI_BL_round_count');
        _roundCount.innerHTML = Rounds.getRoundCount();

        setupRound();
    }

    function setupRound() {
        _el.querySelector('.GL_BL_play_progress').addEventListener('click', function () {
            Audio.setup(this);
            Audio.playSound();
        }, false);
        _setSound();
        _updateScore();
        _createQuestion();
        _updateRoundCount();
    }

    return {
        setup: setup
    };
});
