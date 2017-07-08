const Promise = require('bluebird')
const path = require('path')
const execSync = require('child_process').execSync
// gulp related
const gulp = require('gulp')
const del = require('del')
const through2 = require('through2')
const Vinyl = require('vinyl')
// render content
const pug = require('pug')
const less = require('gulp-less')
const marked = require('marked')
const pygmentize = require('pygmentize-bundled')

const gitBranchName = process.env.TRAVIS_BRANCH || execSync(`git rev-parse --abbrev-ref HEAD`).toString('utf8').replace('\n', '')
const gitCommitSha1 = execSync(`git rev-parse HEAD`).toString('utf8').replace('\n', '')
// only branches deployed by CI have root directories
// all other environments are running on root dir
const rootDir = process.env.TRAVIS_BRANCH && process.env.TRAVIS_BRANCH !== 'master' ? '/branch/'+process.env.TRAVIS_BRANCH : ''

/*
 * configs
 */

const debug = false
const src = {
  pug: [
    'src/**/*.pug',
    '!src/pug/**/**'
  ],
  pugWatch: [
    'src/**/*.pug',
  ],
  markdown: 'src/**/*.md',
  less: 'src/**/*.less',
  staticContent: [
    'src/**/**',
    '!src/pug',
    '!src/pug/**/**',
    '!src/**/*.pug',
    '!src/**/*.md',
    '!src/**/*.less'
  ],
  watch: [
    'src/**/**'
  ]
}
const dest = 'build'

/*
 * bootstrap
 */

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  sanitize: false,
  highlight (code, lang, callback) {
    return pygmentize({lang: lang, format: 'html'}, code, (err, result) => {
      callback(err, result.toString())
    })
  }
})

/*
 * tasks
 */

function cleanBuildDir () {
  return del([dest])
}

function copyStaticContent () {
  return gulp.src(src.staticContent).pipe(gulp.dest(dest))
}

function renderPug () {
  return gulp.src(src.pug).pipe(through2.obj((inputFile, enc, cb) => {
    // process files only
    if (!inputFile.isBuffer()) return
    // decode text from vinyl object
    const pugText = inputFile.contents.toString(enc)
    // render pug to html
    let html = pug.render(pugText, {
      filename: inputFile.path,
      pretty: debug,
      githubLink: getGithubEditLink(inputFile)
    })
    // remap relative links and markdown links
    html = remapLinks(html)
    // create vinyl object for output
    const outputFile = new Vinyl({
      cwd: inputFile.cwd, base: inputFile.base,
      path: inputFile.path.replace('.pug', '.html'),
      contents: new Buffer(html)
    })
    // return
    cb(null, outputFile)
  })).pipe(gulp.dest(dest))
}

function renderMarkdown () {
  return gulp.src(src.markdown).pipe(through2.obj((inputFile, enc, cb) => {
    // process files only
    if (!inputFile.isBuffer()) return
    // decode text from vinyl object
    const markdownText = inputFile.contents.toString(enc)
    // convert markdown to html
    marked(markdownText, (err, content) => {
      if (err) return cb(err)
      console.log(content)
      // render pug to html
      var pugPath = path.resolve(process.cwd(), 'src/pug/md-wrapper.pug')
      html = pug.renderFile(pugPath, {
        filename: pugPath,
        cache: true,
        pretty: debug,
        content: content,
        githubLink: getGithubEditLink(inputFile)
      })
      // remap relative links and markdown links
      html = remapLinks(html)
      // create vinyl object for output
      const outputFile = new Vinyl({
        cwd: inputFile.cwd, base: inputFile.base,
        path: inputFile.path.replace('.md', '.html'),
        contents: new Buffer(html)
      })
      // return
      cb(null, outputFile)
    })
  })).pipe(gulp.dest(dest))
}

function renderLess () {
  return gulp.src(src.less)
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')],
      compress: !debug
    }))
    .pipe(gulp.dest(dest))
}

function watch () {
  gulp.watch(src.pugWatch, renderPug)
  gulp.watch(src.markdown, renderMarkdown)
  gulp.watch(src.less, renderLess)
  gulp.watch(src.staticContent, copyStaticContent)
}

/*
 * helpers
 */

const aTagInHtmlRegex = /\<a *[^\/>]*href="([^"]*|\\")*"*[^\/>]*\>/gi
const mdExtensionInUrlRegex = /(\.md)/gi
function remapLinks (html) {
  return html.replace(aTagInHtmlRegex, function (tag, url) {
    // replace relative URLs only
    if (url.substr(0, 4) === 'http') {
      return tag
    } else {
      return tag.replace(
        url,
        //'https://3d.io/' + (url[0] !== '/' ? url : url.substr(1))
        rootDir + (url[0] === '/' ? url : '/' + url)
      ).replace(
        mdExtensionInUrlRegex,
        '.html'
      )
    }
  })
}

function markdownToHtml (md) {
  return new Promise((resolve, reject) => {
    marked(md, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}

function getGithubEditLink (file) {
  var relativePath = 'src/'+file.path.substr(file.base.length)
  return `https://github.com/archilogic-com/3d-io-website/edit/${gitBranchName}/${relativePath}`
}

/*
 * export
 */

module.exports = {
  watch: watch,
  build: gulp.series(
    cleanBuildDir,
    gulp.parallel(
      copyStaticContent,
      renderPug,
      renderMarkdown,
      renderLess
    )
  )
}