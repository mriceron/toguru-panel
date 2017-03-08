const gulp = require('gulp')
const gutil = require('gulp-util')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const babelify = require('babelify')
const serve = require('gulp-serve')

gulp.task('build:es6', () => {
    return browserify({
            entries: './src/app.es6',
            extensions: ['.es6'],
            debug: true
        })
        .transform('babelify', {
            presets: ['es2015', 'react'],
            plugins: ['transform-class-properties']
        })
        .bundle()
        .on('error', function(err){
            gutil.log(gutil.colors.red.bold('[browserify error]'))
            gutil.log(err.message)
            this.emit('end')
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist'))
})

gulp.task('build:statics', () => {
    return gulp.src(['./static/**/*'])
               .pipe(gulp.dest('./dist'))
})

gulp.task('watch', ['build:es6', 'build:statics'], () => {
    gulp.watch('./src/**/*.es6', ['build:es6'])
    gulp.watch('./static/**/*', ['build:statics'])
})

gulp.task('serve', ['watch'], serve({
  root: ['dist'],
  port: 3000
}))

gulp.task('default', ['serve'])
