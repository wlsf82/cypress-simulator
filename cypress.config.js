const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'ceuijm',
  e2e: {
    fixturesFolder: false,
    supportFile: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
})
