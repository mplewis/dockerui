var gulp = require('gulp')
var webpack = require('gulp-webpack')
var addsrc = require('gulp-add-src')
var browserSync = require('browser-sync')
var del = require('del')

var config = {
  paths: {
    entryPoint: 'app/index.js',
    indexHtml: 'index.html',
    outputDir: 'build',
    watch: ['app/**']
  },
  browserSync: {server: {baseDir: 'build'}},
  webpack: {
    dev: require('./webpack.config.dev.js'),
    prod: require('./webpack.config.prod.js')
  }
}

gulp.task('clean', function(cb) {
  del(['build'], cb)
})

// Don't clean while the server is running, it causes crashes
gulp.task('build-dev-dirty', function() {
  return gulp.src(config.paths.entryPoint)
    .pipe(webpack(config.webpack.dev))
    .pipe(addsrc.append(config.paths.indexHtml))
    .pipe(gulp.dest(config.paths.outputDir))
})

// But clean on the first build
gulp.task('build-dev', ['clean', 'build-dev-dirty'])

gulp.task('build-prod', ['clean'], function() {
  return gulp.src(config.paths.entryPoint)
    .pipe(webpack(config.webpack.prod))
    .pipe(addsrc.append(config.paths.indexHtml))
    .pipe(gulp.dest(config.paths.outputDir))
})

gulp.task('server', ['build-dev'], function() {
  browserSync(config.browserSync)
})

gulp.task('watch', ['server'], function() {
  gulp.watch(config.paths.watch, ['build-dev-dirty', browserSync.reload])
})

gulp.task('default', ['clean', 'watch'])
