const conf = require('./gulp.conf');
const proxy = require('http-proxy-middleware');


module.exports = function () {
  return {
    port: 8080,
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      routes: {
        '/bower_components': 'bower_components'
      },
      middleware: [
        proxy('/api', { target: 'http://localhost:3000' })
      ]
    },
    open: false
  };
};
