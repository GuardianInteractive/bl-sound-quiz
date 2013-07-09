/**
 *
 *
 */
define(['Howl', 'js/app/rounds'], function (Howl, Rounds) {
    'use strict';
    var _sound = null;
    var _circ = Math.PI * 2;
    var _quart = Math.PI / 2;
    var _canvas = null;
    var _ctx = null;
    var _width = null;
    var _height = null;
    var _animRequest = null;
    var _duration = null;

    function updateSound() {
        if (_sound) {
            _sound.stop();
        }

        _sound = null;

        var roundData = Rounds.getRound();
        _sound = new Howl({
            urls: [
                roundData.audio.files.mp3,
                roundData.audio.files.ogg
            ],
            onend: _stopAnimation,
            onplay : _startAnimation
        });
        _duration = roundData.audio.duration;
        _clearProgress();
    }

    function _stopAnimation() {
        window.cancelAnimationFrame(_animRequest);
    }

    function playSound() {
        _sound.stop();
        _sound.play();
    }

    function playTrack(index, elm) {
        _stopAnimation();
        Rounds.setRound(index);
        setup(elm);
        playSound();
    }

    function stopSound() {
        if (_sound) {
            _sound.stop();
            _stopAnimation();
            _clearProgress();
        }
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

        var current = _sound.pos() / _duration || 0;
        var radius = _width / 2.5;
        _ctx.lineWidth = _width / 10;

        _ctx.clearRect(0, 0, _width, _height);
        _ctx.beginPath();
        _ctx.arc(_width / 2, _height / 2, radius, -(_quart), ((_circ) * current) - _quart, false);
        _ctx.stroke();
    }

    function setup(elm) {
        updateSound();
        _canvas =  elm;
        _width = _canvas.clientWidth;
        _height = _canvas.clientHeight;
        _canvas.setAttribute('width', _width);
        _canvas.setAttribute('height', _height);
        _ctx = _canvas.getContext('2d');
        _drawProgress();
    }

    return {
        playSound: playSound,
        playTrack: playTrack,
        stopSound: stopSound,
        updateSound: updateSound,
        setup: setup
    };
});
