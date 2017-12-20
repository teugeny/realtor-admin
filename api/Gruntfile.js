module.exports = function (grunt) {

    //
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.initConfig({
        env : {
            options : {
                //Shared Options Hash
            },
            dev : {
                NODE_ENV : 'development'
            },
            prod : {
                NODE_ENV : 'prod'
            }
        },

        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
    });

    grunt.registerTask('dev', ['env:dev', 'nodemon']);
};