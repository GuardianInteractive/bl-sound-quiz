define(['_'], function (_) {
    var _currentRound = 0;
    var _currentQuestion = 0;

    var _rounds = [
        {
            description: 'it\'s pig\'s blood being poured into a bucket',
            image: '<%= projectUrl %><%= versionDir %>files/images/gir.jpg',
            audio: {
                duration: 17.39,
                files: {
                    mp3: '<%= projectUrl %><%= versionDir %>files/audio/mp3/2_pig_blood_bucket.mp3',
                    ogg: '<%= projectUrl %><%= versionDir %>files/audio/ogg/2_pig_blood_bucket.ogg'
                }
            },
            questions: [
                {
                    question: 'Is the liquid being poured',
                    options: ['chemical', 'animal', 'human'],
                    answer: 1
                },
                {
                    question: 'Is the setting',
                    options: ['dairy farm', 'abattoir', 'vet surgery'],
                    answer: 1
                },
                {
                    question: 'Is the animal',
                    options: ['pig', 'horse', 'cow'],
                    answer: 0
                }
            ]
        },
        {
            description: 'Blowing air through the prevention of terrorism act in the houses of parliament',
            image: '<%= projectUrl %><%= versionDir %>files/images/gir.jpg',
            audio: {
                duration: 32.15,
                files: {
                    mp3: '<%= projectUrl %><%= versionDir %>files/audio/mp3/5_the_prevention_of_terrorism.mp3',
                    ogg: '<%= projectUrl %><%= versionDir %>files/audio/ogg/5_the_prevention_of_terrorism.ogg'
                }
            },
            questions: [
                {
                    question: 'where are we?',
                    options: ['houses of parliament', 'london eye', 'Paddington train station'],
                    answer: 0
                },
                {
                    question: 'what\'s happening?',
                    options: ['rubbing a wooden chair', 'playing an instrument', 'blowing air over paper'],
                    answer: 2
                },
                {
                    question: 'what\'s on the paper?',
                    options: ['disqualification act ', 'same sex couples bill ', 'prevention of terrorism act'],
                    answer: 2
                }
            ]
        },
        {
            description: 'Gun shots',
            image: '<%= projectUrl %><%= versionDir %>files/images/gir.jpg',
            audio: {
                duration: 1.88,
                files: {
                    mp3: '<%= projectUrl %><%= versionDir %>files/audio/mp3/1_gun_shots.mp3',
                    ogg: '<%= projectUrl %><%= versionDir %>files/audio/ogg/1_gun_shots.ogg'
                }
            },
            questions: [
                {
                    question: 'Is the type of sound',
                    options: ['organic', 'man made', 'synthesised'],
                    answer: 1
                },
                {
                    question: 'Is the material',
                    options: ['wood', 'plastic', 'metal'],
                    answer: 2
                },
                {
                    question: 'Is the device',
                    options: ['gun', 'hammer', 'lift'],
                    answer: 0
                }
            ]
        },
        {
            description: 'it\'s a pig\'s lungs being bashed',
            image: '<%= projectUrl %><%= versionDir %>files/images/gir.jpg',
            audio: {
                duration: 23.30,
                files: {
                    mp3: '<%= projectUrl %><%= versionDir %>files/audio/mp3/3_pigs_lungs_beaten.mp3',
                    ogg: '<%= projectUrl %><%= versionDir %>files/audio/ogg/3_pigs_lungs_beaten.ogg'
                }
            },
            questions: [
                {
                    question: 'where are we?',
                    options: ['kitchen', 'school gymnasium', 'abattoir'],
                    answer: 2
                },
                {
                    question: 'the object being hit is a body part. is it:',
                    options: ['a hide', 'a lung', ' a rump'],
                    answer: 1
                },
                {
                    question: 'is the activity undertaken associated with:',
                    options: ['tenderising', 'extraction', 'cleaning'],
                    answer: 1
                }
            ]
        }
    ];

    /**
     * Simple round data getter.
     *
     * @param roundNum {integer} Index of the round.
     * @returns {object} Round properties.
     */
    function getRound(roundNum) {
        return _rounds[roundNum || _currentRound];
    }

    function nextRound() {
        _currentRound += 1;
        _currentQuestion = 0;
        return getRound();
    }

    function nextQuestion() {
        _currentQuestion += 1;
        return getQuestion();
    }

    function getRoundCount() {
        return _rounds.length;
    }

    function getQuestion() {
        return getRound().questions[_currentQuestion];
    }

    function getCurrentRoundCount() {
        return _currentRound + 1;
    }

    function isLastQuestion() {
        return (_currentQuestion === getRound().questions.length - 1);
    }

    function isLastRound() {
        return (_currentRound > getRoundCount() - 1);
    }

    function getTotalQuestionCount() {
        return _.reduce(_rounds, function (memo, round) {
            return memo + round.questions.length;
        }, 0);
    }

    function setRound(roundNum) {
        _currentRound = roundNum;
    }

    function getRounds() {
        return _rounds;
    }


    return {
        getRound: getRound,
        getRounds: getRounds,
        setRound: setRound,
        nextRound: nextRound,
        getRoundCount: getRoundCount,
        getQuestion: getQuestion,
        nextQuestion: nextQuestion,
        getCurrentRoundCount: getCurrentRoundCount,
        isLastQuestion: isLastQuestion,
        isLastRound: isLastRound,
        getTotalQuestionCount: getTotalQuestionCount
    };
});
