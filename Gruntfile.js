/*global module:false*/
module.exports = function(grunt) {

    'use strict';
    var isDev = (grunt.option('dev')) || process.env.GRUNT_ISDEV === '1';
    if (isDev) {
        grunt.log.subhead('Running Grunt in DEV mode');
    }

    //Create some functions for replacing tags in documents
    var tagReplacer = function(tags){
        var replacer = function(content, srcpath) {
            for(var tagName in tags){
                var tagValue = grunt.config.process(tags[tagName]);
                var regex = new RegExp("<%=\\s*"+tagName+"\\s*%>", "g");
                content = content.replace(regex, tagValue);
            }
            return content;
        };
        return replacer;
    };

    var buildTagReplacer = tagReplacer({
        projectUrl: (isDev) ? './' : '<%= projectUrl %>',
        versionDir: (isDev) ? 'v/x/' : '<%= versionDir %>',
        production: (isDev) ? false : true,
        codeobject: grunt.file.read( 'project/src/codeobject.html' ).replace( /<%=\s*projectUrl\s*%>/g, './' )
    });



    grunt.initConfig({
        guid: '00775389-9d61-4e74-b3f8-ce45e8fc7235',
        baseUrl: 'http://interactive.guim.co.uk/world/2012/may/10/obama-same-sex-marriage-share/',

        projectPath: '',
        version: 'x',
        versionDir: 'v/<%= version %>/',
        versionPath: '<%= projectPath %><%= versionDir %>',

        projectUrl: '<%= baseUrl %><%= projectPath %>',
        versionUrl: '<%= baseUrl %><%= projectPath %><%= versionDir %>',

        s3: {
            bucket: 'gdn-cdn'
        },

        watch: {
            sass: {
                files: 'project/src/v/x/styles/**/*.scss',
                tasks: 'sass:dev',
                interrupt: true
            },
            data: {
                files: 'project/src/v/x/data/**/*',
                tasks: 'dir2json:dev',
                interrupt: true
            },
            files: {
                files: 'project/src/v/x/files/**/*',
                tasks: 'copy:filesdev',
                interrupt: true
            },
            root: {
                files: 'project/src/*.*',
                tasks: 'copy:rootdev',
                interrupt: true
            },
            js: {
                files: 'project/src/v/x/js/**',
                tasks: 'copy:jsdev',
                interrupt: true
            }
        },

        jshint: {
            files: ['project/src/v/x/js/**/*.js',
            //exclude these files:
            '!project/src/v/x/js/almond.js', '!project/src/v/x/js/require.js', '!project/src/v/x/js/lib/**/*.js'],
            options: { jshintrc: '.jshintrc' }
        },

        clean: {
            tmp:        ['tmp'],
            build:      ['build']
        },

        sass: {
            common: {
                files: {
                    'build/v/x/styles/min.css': 'project/src/v/x/styles/**/*.scss'
                },
                options: {
                    style:      (isDev) ? '' : 'compressed',
                    debugInfo:  (isDev) ? true : false
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl:    './tmp',
                    out:        './build/v/x/js/game.js',
                    name:       'js/game',

                    paths: {
                        'Howl': 'js/lib/howler',
                        'jquery': 'js/lib/jquery',
                        '_': 'js/lib/lodash',
                        'animPoly': 'js/lib/animFramePolyfill'
                    },

                    optimize:                   (isDev) ? 'none' : 'uglify2',
                    useSourceUrl:               (isDev) ? true : false,
                    wrap:                       (isDev) ? true : false,
                    preserveLicenseComments:    false
                }
            }
        },

        copy: {
            js: {
                files: [{
                    expand: true,
                    cwd: 'project/src/v/x/js',
                    src: ['**'],
                    dest: 'tmp/js/'
                }],
                options: {
                    processContent: buildTagReplacer
                }
            },
            files: {
                files: [
                    {
                        expand: true,
                        cwd: 'project/src/v/x/files',
                        src: ['**'],
                        dest: 'build/v/x/files/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['project/src/v/x/js/lib/curl.js'],
                        dest: 'build/v/x/js/'
                    }
                ]
            },
            root: {
                files: [{
                    expand: true,
                    cwd: 'project/src/',
                    src: ['*.*'],
                    dest: 'build/'
                }],
                options: {
                    processContent: buildTagReplacer
                }
            }
        },

        cssmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'tmp/build/',
                    src: '*.css',
                    dest: 'build/'
                }]
            }
        },

        // Combine contents of `project/src/v/x/data` into a single `data.json` file
        dir2json: {
            build: {
                root: 'project/src/v/x/data/',
                dest: 'tmp/data/data.js',
                options: {
                    space: '\t',
                    amd: true
                }
            }
        },

        // Download from S3
        downloadFromS3: {
            options: {
                bucket: '<%= s3.bucket %>'
            },
            manifest: {
                options: {
                    key: '<%= projectPath %>/manifest.json',
                    dest: 'tmp/manifest.json'
                }
            }
        },

        // Verify manifest
        verifyManifest: {
            options: {
                src: 'tmp/manifest.json'
            }
        },

        // Lock/unlock project
        lockProject: {
            options: {
                bucket: '<%= s3.bucket %>',
                lockfile: '<%= projectPath %>/locked.txt'
            }
        },

        // Upload to S3
        uploadToS3: {
            options: {
                bucket: '<%= s3.bucket %>'
            },
            manifest: {
                options: {
                    key: '<%= projectPath %>/manifest.json',
                    data: '{"guid":"<%= guid %>","version":<%= version %>}',
                    params: {
                        CacheControl: 'no-cache',
                        ContentType: 'application/json'
                    }
                }
            },
            version: {
                files: [{
                    expand: true,
                    cwd: 'build/v/x/',
                    src: [ '**/*' ]
                }],
                options: {
                    pathPrefix: '<%= versionPath %>',
                    params: {
                        CacheControl: 'max-age=31536000'
                    }
                }
            },
            root: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: [ '*.*' ]
                }],
                options: {
                    pathPrefix: '<%= projectPath %>',
                    params: {
                        CacheControl: 'max-age=20'
                    }
                }
            }
        },

        // shell commands
        shell: {
            s3: {
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                },
                command:  's3cmd put -r ./build/ s3://gdn-cdn/world/2012/may/10/obama-same-sex-marriage-share/ --guess-mime-type --human-readable-sizes --add-header="Cache-Control:max-age=100" --acl-public'
            }
        }

    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-dir2json');
    grunt.loadNpmTasks('grunt-shell');
    // Guardian Interactive tasks
    grunt.loadNpmTasks('grunt-gui');

    grunt.registerTask('default', [
        'build',
        'watch'
    ]);

    // build task - link, compile, flatten, optimise, copy
    grunt.registerTask('build', [
        'clean:build',
        'clean:tmp',
        'jshint',
        'sass:common',
        'copy:js',
        'dir2json:build',
        'requirejs',
        'copy:root',
        'copy:files'
    ]);

    grunt.registerTask('s3push', [
        'shell:s3'
    ]);

    // launch sequence
    grunt.registerTask('deploy', [
        'clean:tmp',

        // connect to S3, establish version number
        'createS3Instance',
        'downloadFromS3:manifest',
        'verifyManifest',

        // build project
        'build',

        // upload files
        'lockProject',
        'uploadToS3:manifest',
        'uploadToS3:version',
        'uploadToS3:root',
        'lockProject:unlock',

        // point browser at newly deployed project
        'shell:open'
    ]);
};
