const Promise = require('bluebird')
const path = require('path')
const gulp = require('gulp')
const gzip = require('gulp-gzip')
const s3 = require('gulp-s3')
const execSync = require('child_process').execSync
const build = require('./build.js')

const gitBranchName = process.env.TRAVIS_BRANCH || execSync(`git rev-parse --abbrev-ref HEAD`).toString('utf8').replace('\n', '')
const gitCommitSha1 = execSync(`git rev-parse HEAD`).toString('utf8').replace('\n', '')

// configs

// TODO: increase cdn max age to 1 day once content becomes more stable (See issue #16)
const cdnMaxAge = 60 * 30 // = 30 minutes
const debug = false
const AWS = {
  bucket: '3d.io',
  dir:    gitBranchName === 'master' ? `website/` : `website/branch/${gitBranchName}/`,
  region: 'eu-west-1',
  key:    process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY
}
const src = {
  uploadUncompressed: [
    'build/**/**',
    '!build/**/*.html',
    '!build/**/*.css',
    '!build/**/*.js',
    '!build/**/*.svg'
  ],
  uploadCompressed: [
    'build/**/*.html',
    'build/**/*.css',
    'build/**/*.js',
    'build/**/*.svg'
  ]
}

// tasks

const release = gulp.series(
  build.build,
  uploadCompressed,
  uploadUncompressed
)

function uploadCompressed () {
  return gulp.src(src.uploadCompressed)
    .pipe(gzip({
      append: false, // do not append .gz extension
      threshold: false, // no file size treshold because all files will have gzip headers
      gzipOptions: { level: 9 }
    }))
    .pipe(s3(AWS, {
      headers: {
        'Content-Encoding': 'gzip',
        'Cache-Control': 'max-age=' + cdnMaxAge
      },
      uploadPath: AWS.dir,
      failOnError: true
    }))
}

function uploadUncompressed () {
  return gulp.src(src.uploadUncompressed)
    .pipe(s3(AWS, {
      headers: {
        'Cache-Control': 'max-age=' + cdnMaxAge
      },
      uploadPath: AWS.dir,
      failOnError: true
    }))
}

// export

module.exports = release