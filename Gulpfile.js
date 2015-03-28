var gulp = require('gulp')
var webpack = require('gulp-webpack')
var addsrc = require('gulp-add-src')
var browserSync = require('browser-sync')
var del = require('del')
var runSequence = require('run-sequence')

var config = {
  paths: {
    entryPoint: 'app/index.js',
    indexHtml: 'index.html',
    components: {
      src: 'app/components/**/*.html',
      dest: 'build/app/components/'
    },
    outputDir: 'build',
    watch: ['app/**']
  },
  browserSync: {
    port: 3005,
    server: {
      baseDir: 'build',
    },
    ui: {
      port: 3006
    }
  },
  webpack: {
    dev: require('./webpack.config.dev.js'),
    prod: require('./webpack.config.prod.js')
  }
}

// Returns a webpack pipeline that builds a bundle based on the specified webpack config
function pipelineForWebpackConfig(webpackConfig) {
  return gulp.src(config.paths.entryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(addsrc.append(config.paths.indexHtml))
    .pipe(gulp.dest(config.paths.outputDir))
}

// Delete the build folder
gulp.task('clean', function(cb) {
  del(['build'], cb)
})

// Copy static components files to the build folder under components/
gulp.task('copy-components', function() {
  return gulp.src(config.paths.components.src)
    .pipe(gulp.dest(config.paths.components.dest))
})

// Dirty build: Don't clean while the server is running, it causes crashes
gulp.task('build-dev-dirty', ['copy-components'], function() {
  return pipelineForWebpackConfig(config.webpack.dev)
})

// Produce a clean development build
gulp.task('build-dev', ['clean', 'build-dev-dirty'])

// Produce a clean production build
gulp.task('build-prod', ['clean'], function() {
  return pipelineForWebpackConfig(config.webpack.prod)
})

// Serve the dev build with BrowserSync
gulp.task('server', ['build-dev-dirty'], function() {
  browserSync(config.browserSync)
})

// Watch the app files and serves them
gulp.task('watch', ['server'], function() {
  gulp.watch(config.paths.watch, ['build-dev-dirty', browserSync.reload])
})

// Ensure clean runs and completes before starting watcher.
// Otherwise, copy-components can cause a race condition.
gulp.task('default', function(callback) {
  runSequence('clean', 'watch', callback)
})
