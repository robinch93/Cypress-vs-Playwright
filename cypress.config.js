const { defineConfig } = require('cypress')
const { fs } = require('fs')
const { Utils } = require('./Utils')

const execa = require('execa')
const findBrowser = (browserName) => {

  const version = Utils.findVersion(browserName)
  const browserPath = browserName == 'chromium' ? 'browsers/chromium-' + version + '/chrome-mac/Chromium.app/Contents/MacOS/Chromium' :
    browserName == 'firefox' ? 'browsers/firefox-' + version + '/firefox/Nightly.app/Contents/MacOS/firefox' : 'Browser executable not available'

  return execa(browserPath, ['--version']).then((result) => {

    return {
      name: browserName,
      channel: 'stable',
      family: browserName,
      displayName: browserName,
      version,
      path: browserPath,
      majorVersion: version,
    }
  })
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demowebshop.tricentis.com',
    setupNodeEvents(on, config) {
      return findBrowser('chromium').then((browser) => {
        return {
          browsers: config.browsers.concat(browser),
        }
      })
    }
  }
})
