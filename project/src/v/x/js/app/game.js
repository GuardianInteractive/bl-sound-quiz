/**
 * Created with IntelliJ IDEA.
 * User: andrew
 * Date: 05/07/13
 * Time: 17:42
 * To change this template use File | Settings | File Templates.
 */
define([], function () {
    'use strict';

    var _playerScore = 0;
    var _numAttempts  = 0;

    function correctAnswer() {
        _playerScore += 2 - _numAttempts;
        _numAttempts = 0;
        console.log('Correct answer. Score = %d, attempt = %d', _playerScore, _numAttempts);
    }

    function wrongAnswer() {
        _numAttempts += 1;
        console.log('Wrong answer. Score = %d, attempt = %d', _playerScore, _numAttempts);
    }

    function getScore() {
        return _playerScore;
    }

    return {
        wrongAnswer: wrongAnswer,
        correctAnswer: correctAnswer,
        getScore: getScore
    };
});
