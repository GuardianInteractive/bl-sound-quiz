define(['_'], function(_) {
    var _currentRound = 0;
    var _currentQuestion = 0;

    var _rounds = [
        {
            description: 'it\'s pig\'s blood being poured into a bucket',
            image: '<%= projectUrl %><%= versionDir %>files/images/gir.jpg',
            audio: {
                mp3: '<%= projectUrl %><%= versionDir %>files/audio/mp3/2_pig_blood_bucket.mp3',
                ogg: '<%= projectUrl %><%= versionDir %>files/audio/ogg/2_pig_blood_bucket.ogg'
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
            description: '***GUN SHOT***',
            image: '<%= projectUrl %><%= versionDir %>files/images/gir.jpg',
            audio: {
                mp3: '<%= projectUrl %><%= versionDir %>files/audio/mp3/1_gun_shots.mp3',
                ogg: '<%= projectUrl %><%= versionDir %>files/audio/ogg/1_gun_shots.ogg'
            },
            questions: [
                {
                    question: 'Type of sound',
                    options: ['organic', 'mechanical', 'space'],
                    answer: 1
                },
                {
                    question: 'location',
                    options: ['moon', 'kitchen', 'field'],
                    answer: 2
                },
                {
                    question: 'flavour',
                    options: ['orange', 'chocolate', 'fudge'],
                    answer: 0
                }
            ]
        },
        {
            description: 'it\'s a pig\'s lungs being bashed',
            image: '<%= projectUrl %><%= versionDir %>files/images/gir.jpg',
            audio: {
                mp3: '<%= projectUrl %><%= versionDir %>files/audio/mp3/3_pigs_lungs_beaten.mp3',
                ogg: '<%= projectUrl %><%= versionDir %>files/audio/ogg/3_pigs_lungs_beaten.ogg'
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
    function getRound() {
        return _rounds[_currentRound];
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
        return (_currentQuestion === getRound().questions.length -1);
    }

    function isLastRound() {
        return (_currentRound > getRoundCount() -1);
    }

    function getTotalQuestionCount() {
        return _.reduce(_rounds, function(memo, round) {
            return memo + round.questions.length;
        }, 0);
    }


    return {
        getRound: getRound,
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
