const gulp = require('gulp')
const concat = require('gulp-concat')
const less = require('gulp-less')
const handlebars = require('gulp-compile-handlebars')
const rename = require('gulp-rename')
const merge = require('merge-stream')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')

gulp.task('scripts', () => {
    gulp.src(['js/vendor/**.js', 'js/main.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js'))
})

gulp.task('styles', () => {
    const lessStream = gulp.src(['styles/*.less'])
        .pipe(concat('main.less'))
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))

    const cssStream = gulp.src('styles/vendor/*.css')
        .pipe(concat('vendor.css'))

    merge(lessStream, cssStream)
        .pipe(concat('main.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/css'))
})

gulp.task('assets', () => {
    gulp.src('assets/font/*')
        .pipe(gulp.dest('build/assets/font'))

    gulp.src('assets/img/*')
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true
        }))
        .pipe(gulp.dest('build/assets/img'))
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
gulp.task('php', () => {
    gulp.src(['templates/contact.handlebars'])
        .pipe(handlebars({}, {
            batch: ['partials']
        }))
        .pipe(rename(function(path) {
            path.extname = '.php'
        }))
        .pipe(gulp.dest('build/'))
})

gulp.task('watch', () => {
    gulp.watch('js/**.js', ['scripts'])
    gulp.watch('styles/*.less', ['styles'])
    gulp.watch('templates/*.handlebars', ['handlebars', 'php'])
    gulp.watch('partials/*.handlebars', ['handlebars', 'php'])
})

gulp.task('default', [
    'scripts',
    'styles',
    'handlebars',
    'assets',
    'php',
    'watch'
])
