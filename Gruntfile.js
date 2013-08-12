/* global module:false */
module.exports = function( grunt ) {
    "use strict";

    grunt.config.init({
        pkg: grunt.file.readJSON( "package.json" ),
        paths: {
            dist: "dist/",
            examples: "examples/",
            src: "src/"
        },
        concat: {
            basic: {
                options: {
                    process: true,
                    separator: "\n\n"
                },
                src: [
                    "src/header.scss",
                    "src/options.scss",
                    "src/functions.scss",
                    "src/mixins.scss"
                ],
                dest: "<%= paths.dist %><%= pkg.name %>.scss"
            }
        },
        csslint: {
            strict: {
                options: {
                    "box-sizing": false
                },
                src: "<%= paths.examples %>example.css"
            }
        },
        sass: {
            build: {
                options: {
                    style: "expanded"
                },
                files: {
                    "<%= paths.examples %>example.css": "<%= paths.examples %>src/example.scss"
                }
            }
        },
        watch: {
            src: {
                files: [
                    "<%= paths.examples %>**/*.scss",
                    "<%= paths.src %>**/*.scss"
                ],
                tasks: [
                    "default"
                ]
            }
        }
    });

    // Load plugins from npm
    grunt.task.loadNpmTasks( "grunt-contrib-csslint" );
    grunt.task.loadNpmTasks( "grunt-contrib-concat" );
    grunt.task.loadNpmTasks( "grunt-contrib-sass" );
    grunt.task.loadNpmTasks( "grunt-contrib-watch" );

    // Dev build
    grunt.task.registerTask( "default", [
        "concat",
        "sass",
        "csslint"
    ]);
};