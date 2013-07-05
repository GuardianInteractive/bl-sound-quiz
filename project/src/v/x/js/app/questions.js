define([], function() {
    var _rounds = [
        {
            description: 'it\'s pig\'s blood being poured into a bucket',
            image: 'path/to/image.jpg',
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
            description: 'it\'s a pig\'s lungs being bashed',
            image: 'path/to/image.jpg',
            audio: {
                mp3: 'path/to/audio.mp3',
                ogg: 'path/to/audio.ogg'
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
    function getRound(roundIndex) {
        return _rounds[roundIndex];
    }

    return {
        getRound: getRound
    }
});
