module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      version: '<%= pkg.version %>',
      banner: '// Backbone.Intercept v<%= meta.version %>\n'
    },

    preprocess: {
      intercept: {
        src: 'src/wrapper.js',
        dest: 'dist/backbone.intercept.js'
      }
    },

    template: {
      options: {
        data: {
          version: '<%= meta.version %>'
        }
      },
      intercept: {
        src: '<%= preprocess.intercept.dest %>',
        dest: '<%= preprocess.intercept.dest %>'
      }
    },

    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      intercept: {
        src: '<%= preprocess.intercept.dest %>',
        dest: '<%= preprocess.intercept.dest %>'
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      intercept: {
        src: '<%= preprocess.intercept.dest %>',
        dest: 'dist/backbone.intercept.min.js',
        options: {
          sourceMap: true
        }
      }
    },

    jshint: {
      intercept: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['src/backbone.intercept.js']
      },
      tests: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/unit/*.js']
      }
    },

    mochaTest: {
      spec: {
        options: {
          require: 'test/setup/node.js',
          reporter: 'dot',
          clearRequireCache: true,
          mocha: require('mocha')
        },
        src: [
          'test/setup/helpers.js',
          'test/unit/*.js'
        ]
      }
    },

    connect: {
      options: {
        port: 8000,
        keepalive: true
      },
      browser: {}
    }
  });

  grunt.registerTask('test:browser', 'Test the library in the browser', [
    'jshint',
    'connect'
  ]);

  grunt.registerTask('test', 'Test the library', [
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('build', 'Build the library', [
    'test',
    'preprocess:intercept',
    'template',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('default', 'An alias of test', [
    'test'
  ]);
};
