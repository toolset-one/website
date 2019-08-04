const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const del = require('del')
const browserSync = require('browser-sync').create()
const svgSprite = require('gulp-svg-sprite')
const gcmq = require('gulp-group-css-media-queries')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer');

var paths = {
  html: ['src/**/*.html'],
  htmlWatch: ['src/**/*.html'],
  sass: ['src/sass/**/*'],
  images: 'src/img/**/*',
  fonts: 'src/fonts/**/*',
  useref: ['tmp/**/*.html'],
  copy: ['tmp/**/*.css']
}

gulp.task('watch', ['fileinclude', 'sass'], function () {
  browserSync.init({
    notify: false,
    open: false,
    reloadOnRestart: true,
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>'
      }
    },
    ui: false,
    injectChanges: false,
    ghostMode: false,
    server: {
      baseDir: ['tmp', 'src']
    }
  })

  gulp.watch(paths.html.concat(paths.htmlWatch), ['fileinclude', browserSync.reload])
  gulp.watch(paths.sass, ['sass'])
})

gulp.task('serve', ['watch'])

gulp.task('build', ['html', 'sass-build', 'images', 'fonts'], function () {
    // copy tmp stuff to build
  return gulp.src(paths.copy, { nodir: true })
        .pipe(gulp.dest('public'))
})

// DONE
gulp.task('clean', function () {
  return del(['public', 'tmp'])
})

// DONE
gulp.task('fileinclude', function () {
  return gulp.src(paths.html)
        .pipe($.fileInclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('tmp'))
})

// DONE
gulp.task('html', ['fileinclude'], function () {
  return gulp.src(paths.useref)
        .pipe($.useref({ searchPath: 'src' }))
        .pipe($.if('*.js', $.uglify()))
        .pipe(gulp.dest('public'))
})

// DONE
gulp.task('sass', function () {
  return gulp.src(paths.sass)
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ["last 10 versions", "ie >= 9"],
            cascade: false
        }))
        .pipe(gulp.dest('tmp'))
        .pipe(browserSync.stream())
})

// DONE
gulp.task('sass-build', function () {
  return gulp.src(paths.sass)
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ["last 10 versions", "ie >= 9"],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream())
})

// DONE
gulp.task('images', function () {
  return gulp.src(paths.images)
        .pipe(gulp.dest('public/img'))
})

// DONE
gulp.task('fonts', function () {
  return gulp.src(paths.fonts)
        .pipe(gulp.dest('public/fonts'))
})

gulp.task('default', ['build'])
