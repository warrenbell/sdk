'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-proxy');

  grunt.initConfig({

    connect: {
      server: {
        options: {
          port: 3000,
          middleware: function (connect) {
            return [
              require('grunt-connect-proxy/lib/utils').proxyRequest,
              connect.static('./application'),
              connect().use(
                '/bower_components',
                connect.static('./application/bower_components')
              )
            ];
          }
        },
        proxies: [{
            context: '/proxy',
            host: 'api.cloudcms.com',
            port: 80,
            timeout: 300000,
            https: false,
            changeOrigin: true,
            xforward: true,
            rewrite: {
                '^/proxy': ''
            }
        }]
      }
    },

    watch: {
      server: {
        files: [
            '/index.html'
        ]
      }
    }
  });

  grunt.registerTask('server', ['configureProxies:server', 'connect:server', 'watch:server']);

};
