const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const prefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');
const { series } = require('gulp');

// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.
function css(cb) {
    gulp.src('project/sass/main.scss')
        .pipe(sass())
        .pipe(prefixer())
        .pipe(gulp.dest('dist/sass'));
    cb();
}

// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function html(cb) {
    gulp.src('project/index.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('dist/html'))
        .pipe(connect.reload());
    cb();
}

function watch(cb) {
    connect.server({
        root: 'dist/html',
        livereload: true,
        port: 8000,
    });

    gulp.watch('project/index.pug', series(html));
    cb();
}

exports.default = gulp.series(watch, css, html);
