/**
 * Created with IntelliJ IDEA.
 * User: andrew
 * Date: 05/07/13
 * Time: 17:42
 * To change this template use File | Settings | File Templates.
 */
define(['js/app/rounds', 'Howl'], function (Rounds, Howl) {
    'use strict';

    function correctAnswer() {
        console.log('correct');
    }

    function wrongAnswer() {
        console.log('wrong');
    }

    return {
        wrongAnswer: wrongAnswer,
        correctAnswer: correctAnswer
    };
});
