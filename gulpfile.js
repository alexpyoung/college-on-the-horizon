var gulp = require('gulp')
var browserify = require('gulp-browserify')
var concat = require('gulp-concat')
var less = require('gulp-less')
var handlebars = require('gulp-compile-handlebars')
var rename = require('gulp-rename')
var merge = require('merge-stream')
var cleanCSS = require('gulp-clean-css')

gulp.task('scripts', function() {
    gulp.src('js/**/*.js')
        .pipe(gulp.dest('build/js'))
})

gulp.task('styles', function() {
    var lessStream = gulp.src(['styles/*.less'])
        .pipe(concat('main.less'))
        .pipe(less())

    var cssStream = gulp.src('styles/vendor/*.css')
        .pipe(concat('vendor.css'))

    return merge(lessStream, cssStream)
        .pipe(concat('main.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/css'))
})

gulp.task('assets', function() {
    gulp.src('img/**/*.*')
        .pipe(gulp.dest('build/img'))
})

gulp.task('handlebars', function() {
    gulp.src('templates/*.handlebars')
        .pipe(handlebars({}, {
            batch: ['partials']
        }))
        .pipe(rename(function(path) {
            path.extname = '.html'
        }))
        .pipe(gulp.dest('build/'))
})

gulp.task('watch', function() {
    gulp.watch('js/**.js', ['scripts'])
    gulp.watch('styles/*.less', ['styles'])
    gulp.watch('templates/*.handlebars', ['handlebars'])
    gulp.watch('partials/*.handlebars', ['handlebars'])
})

gulp.task('default', [
    'scripts',
    'styles',
    'handlebars',
    'assets',
    'watch'
])
