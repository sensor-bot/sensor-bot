const gulp = require('gulp');
const Logger = require('./src/utils/logger');
const nodemon = require('gulp-nodemon');
const mongobackup = require('mongobackup');
const defaultCfg = require('./config/default');

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

gulp.task('seed-stations', function() {
  mongobackup.import({
    host: defaultCfg.mongodb.host,
    port: defaultCfg.mongodb.port,
    db: defaultCfg.mongodb.db,
    collection: 'stations',
    file: './seed-data/stations.json'
  });
});

gulp.task('seed-measurements', function() {
  mongobackup.import({
    host: defaultCfg.mongodb.host,
    port: defaultCfg.mongodb.port,
    db: defaultCfg.mongodb.db,
    collection: 'measurements',
    file: './seed-data/measurements.json'
  });
});

gulp.task('seed', ['seed-stations', 'seed-measurements']);

// Run the project in development mode with node debugger enabled
gulp.task('default', ['seed', 'nodemon']);