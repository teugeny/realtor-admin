module.exports = function (grunt) {

    //
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.initConfig({
        env : {
            options : {
                //Shared Options Hash
            },
            prod : {
                NODE_ENV : 'prod'
            }
        },

        nodemon: {
            prod: {
                script: 'index.js'
            }
        },
    });

    grunt.registerTask('prod', ['env:prod', 'nodemon']);
};