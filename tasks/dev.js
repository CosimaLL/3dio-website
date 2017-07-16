const gulp = require('gulp')
const build = require('./build')
const chalk = require('chalk')
const spawn = require('child_process').spawn

// configs

const src = {
  pug: [
    'src/**/*.pug',
  ],
  markdown: [
    'src/**/*.md'
  ],
  less: [
    'src/**/*.less',
  ],
  staticContent: [
    'src/**/**',
    '!src/pug-common/**/**',
    '!src/**/*.pug',
    '!src/**/*.md',
    '!src/**/*.less'
  ]
}

// tasks

const runDevEnvironment = gulp.series(
  build.build,
  gulp.parallel(
    // watch source folder -> rebuild
    watch,
    // watch build folder -> update browser
    runLiteServer
  )
)

function watch () {
  gulp.watch(src.pug, build.renderPug)
  gulp.watch(src.markdown, build.renderMarkdown)
  gulp.watch(src.less, build.renderLess)
  gulp.watch(src.staticContent, build.copyStaticContent)
}

function runLiteServer () {
  return new Promise((resolve, reject) => {
    const ls = spawn('node_modules/.bin/lite-server', ['-c', 'tasks/lite-server.config.js'])
    ls.stdout.on('data', (data) => {
      console.log(`lite-server: ${data}`)
    })
    ls.stderr.on('data', (data) => {
      console.error(chalk.red(`lite-server: ${data}`))
    })
    ls.on('close', (code) => {
      if (code === 0) {
        console.log(`lite-server: stopped`)
        resolve()
      } else {
        throw new Error(`lite-server: exited with code ${code}`)
        reject()
      }
    })
  })
}

// tasks

module.exports = runDevEnvironment