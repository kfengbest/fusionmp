'use strict';

var gulp      = require('gulp'),
    nodemon   = require('gulp-nodemon'),
    when      = require('gulp-if'),
    shell     = require('gulp-shell');


// the paths to our app files
var paths = {
  // all our client app js files, not including 3rd party js files
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/styles/style.css'],
  test: ['specs/**/*.js']
};

// any changes made to your
// client side code will automagically refresh your page
// with the new changes
gulp.task('start', ['serve'],function () {
});

gulp.task('karma', shell.task([
  'karma start'
]));

// start our node server using nodemon
gulp.task('serve', function() {
  nodemon({script: './server/server.js', ignore: 'node_modules/**/*.js'});
});

gulp.task('default', ['start']);

