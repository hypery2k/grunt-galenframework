module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 3000
        }
      }
    },
    galen: {
      local: {
        src: ['test/**/*.test.js'],
        options: {
          output: true,
          url: 'http://127.0.0.1:3000',
          htmlReport: true,
          htmlReportDest: 'dist',
          devices: {
            desktop: {
              deviceName: 'desktop',
              browser: 'firefox',
              size: '1280x800'
            },
            tablet: {
              deviceName: 'tablet',
              browser: 'firefox',
              size: '768x576'
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-galenframework');

  grunt.registerTask('default', ['connect:server', 'galen:local']);
};
