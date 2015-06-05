module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'app.js', 'app/*.js','public/ng/*.js','public/js/*.js']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
};
