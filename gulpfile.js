var gulp = require('gulp');
var logger = require('winston');
var nodemon = require('gulp-nodemon');

// Nodemon task
gulp.task('nodemon', function () {
  var stream = nodemon({
    script: 'src/',
    ext: 'js json html'
  });
  
  stream.on('start', function () {
    logger.info('App has started');
  }).on('quit', function () {
    logger.info('App has quit');
    process.exit();
  }).on('restart', function (files) {
    logger.info('App restarted due to: ', files);
  });

  return;
});

// Run the project in development mode with node debugger enabled
gulp.task('default', ['nodemon']);