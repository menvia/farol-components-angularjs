const babel = require('gulp-babel');
const concat = require('gulp-concat');
const fileInclude = require('gulp-file-include');
const gulp = require('gulp');
const ngAnnotate = require('gulp-ng-annotate');
const pump = require('pump');
const uglifyEs = require('gulp-uglify-es');

const job = function(cb, debug) {
  const pumpSteps = [
    gulp.src([
      'src/components.js',
      'src/frl-avatar/frl-avatar.js',
      'src/frl-project-icon/frl-project-icon.js',
      'src/frl-src.js',
      'src/index.js',
    ]),
    fileInclude({
      prefix: '@@',
      basepath: '@file',
    }),
    babel({
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-strict-mode'],
      ignore: ['dist/', 'node_modules'],
    }),
    ngAnnotate(),
    concat('angular-farol-components.js'),
  ];
  // If it is not in debug it will also uglify
  if (!debug) {
    pumpSteps.push(
        uglifyEs.default({
        // preserveComments: $.uglifySaveLicense,
          compress: {
            unused: false,
          },
        })
    );
  }
  pumpSteps.push(gulp.dest('dist'));
  pump(pumpSteps, cb);
};

const debug = function(cb) {
  job(cb, true);
};

const production = function(cb) {
  job(cb, false);
};

gulp.task('default', production);
gulp.task('debug', debug);
