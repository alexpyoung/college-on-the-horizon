var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var minifyCSS = require('gulp-minify-css');
var embedlr = require('gulp-embedlr');

gulp.task('scripts', function() {
    gulp.src(['js/**/*.js'])
        .pipe(browserify())
        .pipe(concat('dest.js'))
        .pipe(gulp.dest('dist/build'))
        .pipe(refresh(server))
})

gulp.task('styles', function() {
    gulp.src(['css/main.less'])
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('css/'))
        .pipe(refresh(server))
})

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('handlebars', function() {
    gulp.src('*.handlebars')
        .pipe(handlebars({}, {
            batch: ['partials']
        }))
        .pipe(rename(function(path) {
            path.extname = '.html';
        }))
        .pipe(gulp.dest('./'));
})

gulp.task('default', function() {
    gulp.run('lr-server', 'scripts', 'styles', 'handlebars');

    gulp.watch('js/**', function(event) {
        gulp.run('scripts');
    })

    gulp.watch('css/**', function(event) {
        gulp.run('styles');
    })

    gulp.watch('**/*.handlebars', function() {
        gulp.run('handlebars');
    })
})
