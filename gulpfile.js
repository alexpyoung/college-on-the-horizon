const gulp = require('gulp')
const browserify = require('gulp-browserify')
const concat = require('gulp-concat')
const less = require('gulp-less')
const handlebars = require('gulp-compile-handlebars')
const rename = require('gulp-rename')
const merge = require('merge-stream')
const cleanCSS = require('gulp-clean-css')

gulp.task('scripts', () => {
    gulp.src('js/**/*.js')
        .pipe(gulp.dest('build/js'))
})

gulp.task('styles', () => {
    const lessStream = gulp.src(['styles/*.less'])
        .pipe(concat('main.less'))
        .pipe(less())

    const cssStream = gulp.src('styles/vendor/*.css')
        .pipe(concat('vendor.css'))

    return merge(lessStream, cssStream)
        .pipe(concat('main.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/css'))
})

gulp.task('assets', () => {
    gulp.src('assets/**/*.*')
        .pipe(gulp.dest('build/assets'))
})

gulp.task('handlebars', () => {
    gulp.src('templates/*.handlebars')
        .pipe(handlebars({}, {
            batch: ['partials']
        }))
        .pipe(rename(function(path) {
            path.extname = '.html'
        }))
        .pipe(gulp.dest('build/'))
})

gulp.task('watch', () => {
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
