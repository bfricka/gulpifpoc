/*eslint-env node*/
'use strict';

const gulp = require('gulp');
const fail = require('gulp-fail');
const gulpif = require('gulp-if');
const rimraf = require('rimraf');

function returntrue() { return true; }
function returnfalse() { return false; }

gulp.task('clean', done => rimraf('b', done));

function copyTask(cond) {
  return function () {
    let stream = gulp.src('a/*.*')
      .pipe(gulpif(cond, fail(`Failed because ${cond}`)))
      .pipe(gulp.dest('b'));
    stream.on('end', () => console.log('Done called'));
    return stream;
  };
}

gulp.task('copy:bool:true', ['clean'], copyTask(true));
gulp.task('copy:bool:false', ['clean'], copyTask(false));
gulp.task('copy:func:true', ['clean'], copyTask(returntrue));
gulp.task('copy:func:false', ['clean'], copyTask(returnfalse));
