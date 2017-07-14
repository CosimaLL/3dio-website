const Promise = require('bluebird')
const path = require('path')
const gulp = require('gulp')
const gzip = require('gulp-gzip')
const s3 = require('gulp-s3')
const execSync = require('child_process').execSync
const build = require('./build.js').build

const gitBranchName = process.env.TRAVIS_BRANCH || execSync(`git rev-parse --abbrev-ref HEAD`).toString('utf8').replace('\n', '')
const gitCommitSha1 = execSync(`git rev-parse HEAD`).toString('utf8').replace('\n', '')

/*
 * configs
 */

const debug = false
const AWS = {
  bucket: '3d.io',
  dir:    gitBranchName === 'master' ? `` : `website-branch/${gitBranchName}/`,
  region: 'eu-west-1',
  key:    process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY
}
const src = {
  publishUncompressed: [
    'build/**/**',
    '!build/**/*.html',
    '!build/**/*.css',
    '!build/**/*.js',
    '!build/**/*.svg'
  ],
  publishCompressed: [
    'build/**/*.html',
    'build/**/*.css',
    'build/**/*.js',
    'build/**/*.svg'
  ]
}

/*
 * tasks
 */

function publishCompressed () {
  return gulp.src(src.publishCompressed)
    .pipe(gzip({
      append: false, // do not append .gz extension
      threshold: false, // no file size treshold because all files will have gzip headers
      gzipOptions: { level: 9 }
    }))
    .pipe(s3(AWS, {
      headers: { 'Content-Encoding': 'gzip' },
      uploadPath: AWS.dir,
      failOnError: true
    }))
}

function publishUncompressed () {
  return gulp.src(src.publishUncompressed)
    .pipe(s3(AWS, {
      uploadPath: AWS.dir,
      failOnError: true
    }))
}

/*
 * export
 */

module.exports = gulp.series(
  build,
  gulp.parallel(
    publishCompressed,
    publishUncompressed
  )
)