const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const pump = require('pump');

const job = function(cb, debug) {
  const pumpSteps = [
    gulp.src(['src/components.js', 'src/frl-project-icon.js', 'src/index.js']),
    babel({
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-strict-mode'],
      ignore: ['dist/', 'node_modules'],
    }),
    concat('angular-farol-components.js'),
  ];
  // If it is not in debug it will also uglify
  if (!debug) {
    pumpSteps.push(
        uglify({
          mangle: {
            reserved: ['$injector'],
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
