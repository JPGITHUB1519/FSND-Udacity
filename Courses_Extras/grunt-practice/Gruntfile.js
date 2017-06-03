module.exports = function(grunt) {
    // samples
    grunt.registerTask('speak', function() {
        console.log("I'm Speaking");
    });

    grunt.registerTask('watch', function() {
        console.log("I'm watching you.....");
    });

    // run both of above
    grunt.registerTask('both', ['speak', 'watch']);

    // this runs when I type grunt
    grunt.registerTask('default', function() {
        console.log('Default PAPUSH');
    });


    // plugins samples

    // configurations for all tasks
    grunt.initConfig({
        concat: {
            js: {
                src: ['js/a.js', 'js/b.js'],
                dest: 'build/js/scripts.js',
            },
            css: {
                src: ['css/a.css', 'css/b.css'],
                dest: 'build/css/styles.css'
            }
        },

        watch: {
            js: {
               files: ['js/**/*.js'],
               // to run an specified portion
               tasks: ['concat:js']
            },
            css: {
               files: ['css/**/*.css'],
               tasks: ['concat:css']
            }
        },

        uglify: {
            my_target: {
                files: {
                    'build/js/scripts.js': ['build/js/scripts.js']
                }
            }
        },

        cssmin: {
            s
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['concat', 'watch']);
};
