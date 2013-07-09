/**
 *
 *
 */
define(['Howl', 'js/app/rounds'], function ( Howl, Rounds) {
    'use strict';
    var _sound = null;
    var _circ = Math.PI * 2;
    var _quart = Math.PI / 2;
    var _canvas = null;
    var _ctx = null;
    var _width = null;
    var _height = null;
    var _animRequest = null;

    // RequestAnimationFrame polyfill
    // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    (function() {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    function updateSound() {
        if (_sound) {
            _sound.stop();
        }

        _sound = null;

        var roundData = Rounds.getRound();
        _sound = new Howl({
            urls: [
                roundData.audio.mp3,
                roundData.audio.ogg
            ],
            onend: _stopAnimation,
            onplay : _startAnimation
        });
        _clearProgress();
    }

    function _stopAnimation() {
        window.cancelAnimationFrame(_animRequest);
    }

    function playSound() {
        _sound.stop();
        _sound.play();
    }

    function stopSound() {
        _sound.stop();
    }

    function _drawProgress() {
            _ctx.beginPath();
            _ctx.strokeStyle = '#FFF';
            _ctx.lineCap = 'square';
            _ctx.closePath();
            _ctx.fill();
            _ctx.lineWidth = 8.2;
    }

    function _startAnimation() {
        _stopAnimation();
        _animate();
    }

    function _clearProgress() {
        if (_ctx) {
            _ctx.clearRect(0, 0, _width, _height);
        }
    }

    function _animate() {
        _animRequest = window.requestAnimationFrame(_animate);

        var current = _sound.pos() / _sound._duration || 0;
        _ctx.clearRect(0, 0, _width, _height);
        _ctx.beginPath();
        _ctx.arc(_width/2, _height/2, 37, -(_quart), ((_circ) * current) - _quart, false);
        _ctx.stroke();
    }

    function setup() {
        updateSound();
        _canvas =  document.querySelector('.GL_BL_play_progress');
        _ctx = _canvas.getContext('2d');
        _width = _canvas.width;
        _height = _canvas.height;
        _drawProgress();
    }

    //draw(30 / 100);

    return {
        playSound: playSound,
        stopSound: stopSound,
        updateSound: updateSound,
        setup: setup
    };
});
