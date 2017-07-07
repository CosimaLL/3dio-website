const gulp = require('gulp')

gulp.task('dev', gulp.series(
  require('./tasks/build').build,
  require('./tasks/build').watch
))
gulp.task('build', require('./tasks/build').build)
gulp.task('dist', require('./tasks/dist'))