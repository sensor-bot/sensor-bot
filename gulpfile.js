const gulp = require('gulp');
const Logger = require('./src/utils/logger');
const nodemon = require('gulp-nodemon');

const logger = new Logger('build');

// Nodemon task
gulp.task('nodemon', function () {
  var stream = nodemon({
    script: 'src/',
    ext: 'js json html'
  });
  
  stream.on('quit', function () {
    logger.build('App has quit');
    process.exit();
  }).on('restart', function (files) {
    logger.build('App restarted due to: ', files);
  });

  return;
});

// Run the project in development mode with node debugger enabled
gulp.task('default', ['nodemon']);