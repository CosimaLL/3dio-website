// https://github.com/johnpapa/lite-server
// https://browsersync.io/docs/options/

const buildDir = 'build'

module.exports = {
  port: 8080,
  startPath: '/',
  files: buildDir,
  serveStatic: [buildDir], // uses index.html in directories
  server: {
    baseDir: buildDir,
    routes: {
      '/': buildDir
    },
    directory: true,
    // this is required to get directory listings (?bug?)
    middleware: { 1: null }
  },
  scrollRestoreTechnique: 'cookie',
  reloadDebounce: 1500
}