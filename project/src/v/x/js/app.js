define(['Howl', 'js/app/gui', 'js/app/rounds'], function (Howl, Gui, Rounds) {
    'use strict';

    var _sound = null;

    function _progressRound() {
        _currentRound += 1;
        _currentQuestion = 0;

        if (_currentRound >= _rounds.length) {
            _finishGame();
        } else {
            _setupRound();
            _gui.question_wrapper.style.display = 'block';
            _gui.win_wrapper.style.display = 'none';
        }
    }

    function _finishGame() {
        _gui.win_wrapper.style.display = 'none';
        _gui.end_wrapper.style.display = 'block';
    }

    function _progressQuestion() {
        _currentQuestion += 1;
        if (_currentQuestion >= _rounds[_currentRound].questions.length ) {
            _winScreen()
        } else {
            _setupQuestion();
        }
    }

    function _wrongAnswer(event) {
        this.setAttribute('disabled', 'disabled')
        this.removeEventListener('click',_wrongAnswer, false);
        console.log('wrong');
    }

    function _correctAnswer(event) {
        this.removeEventListener('click',_correctAnswer, false);
        console.log('correct');
        _progressQuestion();
    }

    function setupRound() {


        Gui.createQuestion();
    }

    return {
        start: setupRound
    };
});