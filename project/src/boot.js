define([], function() {
    'use strict';

    return {
        /**
         *
         * @param el        : The Element of the interactive that is being progressively enhanced.
         * @param context   : The DOM context this module must work within.
         * @param config    : The configuration object for this page.
         * @param mediator  : The event system (publish/subscribe) for this page.
         *
         **/
        boot: function (el, context, config, mediator) {
            var cfg = {
                baseUrl: '<%= projectUrl %><%= versionDir %>'
            };

            require(cfg, ['js/game']).then(function(Game) {
                Game.setup(el);
            });
        }
    };
});
