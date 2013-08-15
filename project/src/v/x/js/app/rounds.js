define(['_'], function (_) {
    var _currentRound = 0;
    var _currentQuestion = 0;

    var _rounds = [
        {
            description: "A pig's blood is poured into a bucket as part of the butchery process at 'One Pig' in Shoreditch, East London",
            image: '<%= projectUrl %><%= versionDir %>files/images/pigs.jpg',
            audio: {
                duration: 17.39,
                files: {
                    mp3: '<%= projectUrl %><%= versionDir %>files/audio/mp3/2_pig_blood_bucket.mp3',
                    ogg: '<%= projectUrl %><%= versionDir %>files/audio/ogg/2_pig_blood_bucket.ogg'
                }
            },
            questions: [
                {
                    question: 'What type of liquid is being poured?',
                    options: ['chemical', 'animal', 'human'],
                    answer: 1
                },
                {
                    question: 'What is the setting?',
                    options: ['dairy farm', 'abattoir', 'vet surgery'],
                    answer: 1
                },
                {
                    question: 'Which animal does the liquid come from?',
                    options: ['pig', 'horse', 'cow'],
                    answer: 0
                }
            ]
        },
        {
            description: 'Matthew Herbert blows through a copy of The Prevention of Terrorism Act in the Houses of Parliament in June, 2008',
            image: '<%= projectUrl %><%= versionDir %>files/images/parliament.jpg',
            audio: {
                duration: 32.15,
                files: {
                    mp3: '<%= projectUrl %><%= versionDir %>files/audio/mp3/5_the_prevention_of_terrorism.mp3',
                    ogg: '<%= projectUrl %><%= versionDir %>files/audio/ogg/5_the_prevention_of_terrorism.ogg'
                }
            },
            questions: [
                {
                    question: 'Where is this sound being made?',
                    options: ['Houses of Parliament', 'London Eye', 'Paddington train station'],
                    answer: 0
                },
                {
                    question: 'What is happening?',
                    options: ['A wooden chair is being rubbed', 'An instrument is being played', 'Air is being blown over paper'],
                    answer: 2
                },
                {
                    question: "What is written on the paper?",
                    options: ['Disqualification Act ', 'Marriage (Same Sex Couples) Act', 'Prevention of Terrorism Act'],
                    answer: 2
                }
            ]
        },
        {
            description: "Israeli IDF soldiers shoot at unarmed protestors against a wall, recorded by Waleed Agel",
            image: '<%= projectUrl %><%= versionDir %>files/images/palestine.jpg',
            audio: {
                duration: 1.88,
                files: {
                    mp3: '<%= projectUrl %><%= versionDir %>files/audio/mp3/1_gun_shots.mp3',
                    ogg: '<%= projectUrl %><%= versionDir %>files/audio/ogg/1_gun_shots.ogg'
                }
            },
            questions: [
                {
                    question: 'What kind of sound is this?',
                    options: ['organic', 'man made', 'synthesised'],
                    answer: 1
                },
                {
                    question: 'What kind of material is making it?',
                    options: ['wood', 'plastic', 'metal'],
                    answer: 2
                },
                {
                    question: 'What kind of device is it?',
                    options: ['gun', 'hammer', 'lift'],
                    answer: 0
                }
            ]
        },
				{
					description: "A loaf of Hovis bread being opened in Whitstable, September 2011",
					image: '<%= projectUrl %><%= versionDir %>files/images/hovis.jpg',
					audio: {
						duration: 5.85,
            files: {
                mp3: '<%= projectUrl %><%= versionDir %>files/audio/mp3/4_hovis.mp3',
                ogg: '<%= projectUrl %><%= versionDir %>files/audio/ogg/4_hovis.ogg'
            }
					},
					questions: [
              {
                  question: 'What kind of sound is this?',
                  options: ['human', 'animal', 'material'],
                  answer: 2
              },
              {
                  question: 'What kind of material?',
                  options: ['fabric', 'plastic', 'metallic'],
                  answer: 1
              },
              {
                  question: 'What kind of plastic?',
                  options: ['part of the interior of a car', "a well-known children's toy", 'food packaging'],
                  answer: 2
              }
          ] 
				},
        {
            description: "A pig's lungs are bashed to extract blood as part of the butchery process at 'One Pig' in Shoreditch, East London",
            image: '<%= projectUrl %><%= versionDir %>files/images/pigs.jpg',
            audio: {
                duration: 23.30,
                files: {
                    mp3: '<%= projectUrl %><%= versionDir %>files/audio/mp3/3_pigs_lungs_beaten.mp3',
                    ogg: '<%= projectUrl %><%= versionDir %>files/audio/ogg/3_pigs_lungs_beaten.ogg'
                }
            },
            questions: [
                {
                    question: 'Where is this sound being made?',
                    options: ['kitchen', 'school gymnasium', 'abattoir'],
                    answer: 2
                },
                {
                    question: 'What type of body part is being hit?',
                    options: ['a hide', 'a lung', ' a rump'],
                    answer: 1
                },
                {
                    question: 'What kind of activity is being undertaken?',
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
