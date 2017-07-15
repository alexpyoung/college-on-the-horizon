var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var merge = require('merge-stream');
var server = lr();
var minifyCSS = require('gulp-minify-css');
var embedlr = require('gulp-embedlr');

gulp.task('scripts', function() {
    gulp.src(['js/**/*.js'])
        .pipe(browserify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(refresh(server))
})

gulp.task('styles', function() {
    var lessStream = gulp.src(['css/main.less'])
        .pipe(less())

    var cssStream = gulp.src('css/*.css')
        .pipe(concat('vendor.css'))

    return merge(lessStream, cssStream)
        .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('build/css'))
        .pipe(refresh(server))
})

gulp.task('assets', function() {
    gulp.src('img/**/*.*')
        .pipe(gulp.dest('build/img'))
})

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('handlebars', function() {
    gulp.src('templates/*.handlebars')
        .pipe(handlebars({}, {
            batch: ['partials']
        }))
        .pipe(rename(function(path) {
            path.extname = '.html';
        }))
        .pipe(gulp.dest('build/'));
})

gulp.task('default', function() {
    gulp.run('lr-server', 'scripts', 'styles', 'handlebars', 'assets');

    gulp.watch('js', function(event) {
        gulp.run('scripts');
    })

    gulp.watch('css', function(event) {
        gulp.run('styles');
    })

    gulp.watch('templates', function() {
        gulp.run('handlebars');
    })
})
