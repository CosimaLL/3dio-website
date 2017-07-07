const gulp = require('gulp')

gulp.task('dev', require('./tasks/build').watch)
gulp.task('build', require('./tasks/build').build)
gulp.task('dist', require('./tasks/dist'))