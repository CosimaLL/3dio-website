// gulp 4 - https://github.com/gulpjs/gulp/tree/4.0
const gulp = require('gulp')

// register tasks for command line
gulp.task('dev', require('./tasks/dev'))
gulp.task('build', require('./tasks/build').build)
gulp.task('release', require('./tasks/release'))