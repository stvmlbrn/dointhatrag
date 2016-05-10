'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    develop: {
      server: {
        file: 'app.js'
      }
    },

    jshint: {
      all: ['public/src/js/**/*.js']
    },

    uglify: {
      build: {
        files: [{
          cwd: 'public/src/js',
          src: '**/*.js',
          dest: 'public/dist/js',
          expand: true
        }]
      }
    },

    cssmin: {
      build: {
        files: [{
          cwd: 'public/src/css',
          src: '**/*.css',
          dest: 'public/dist/css',
          expand: true
        }]
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          cwd: 'public/src/img',
          src: ['**/*.{png,gif,jpg}'],
          dest: 'public/dist/img',
          expand: true
        }]
      }
    },

    handlebars: {
      options: {
        processName: function(filePath) {
          return filePath.replace(/^public\/src\/templates\//,"").replace(/\.hbs$/,"");
        }
      },
      all: {
        files: {
          'public/dist/templates/main.js': ['public/src/templates/*.hbs'],
          'public/dist/templates/admin.js': ['public/src/templates/admin/*.hbs']
        }
      }
    },

    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      scripts: {
        files: ['public/src/js/**/*.js'],
        tasks: ['jshint', 'uglify'],
        options: {livereload: reloadPort}
      },
      css: {
        files: ['public/src/css/**/*.css'],
        tasks: ['cssmin'],
        options: {livereload: reloadPort}
      },
      img: {
        files: ['public/src/img/**/*.{png.gif,jpg}'],
        tasks: ['imagemin'],
        options: {
          atBegin: true
        }
      },
      hbs: {
        files: ['public/src/templates/**/*.hbs'],
        tasks: ['handlebars']
      },
      views: {
        files: [
          'app/views/*.jade',
          'app/views/**/*.jade'
        ],
        options: { livereload: reloadPort }
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'develop',
    'watch',
    'jshint',
    'uglify',
    'imagemin',
    'cssmin'
  ]);
};
