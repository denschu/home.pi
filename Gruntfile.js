module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    watch: {
      server: {
        files:  '<%= jshint.files %>',
        tasks:  [ 'jshint' ]
      }
    },

    shell : {
      createBuild : {
        command : 'rm -rf build; cp -R src build; cp package.json build/package.json;'
      },
      publish : {
        command : 'scp -r build pi@raspberrypi.local:home.pi-server'
      },
      install : {
        command : 'ssh pi@raspberrypi.local "cd home.pi-server; npm install --production"'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('deploy', 'shell:createBuild', 'shell:publish');

};