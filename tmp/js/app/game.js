/**
 * Created with IntelliJ IDEA.
 * User: andrew
 * Date: 05/07/13
 * Time: 17:42
 * To change this template use File | Settings | File Templates.
 */
define(['js/app/rounds'], function (Rounds) {
    'use strict';

    var _playerScore = 0;
    var _numAttempts  = 0;
    var POINTS_PER_ROUND = 2;
    var MAX_POINTS = Rounds.getTotalQuestionCount() * POINTS_PER_ROUND;

    function correctAnswer() {
        _playerScore += POINTS_PER_ROUND - _numAttempts;
        _numAttempts = 0;
    }

    function wrongAnswer() {
        _numAttempts += 1;
    }

    function getScore() {
        return _playerScore;
    }

    function getMaxScore() {
        return MAX_POINTS;
    }

    return {
        wrongAnswer: wrongAnswer,
        correctAnswer: correctAnswer,
        getScore: getScore,
        getMaxScore: getMaxScore
    };
});
