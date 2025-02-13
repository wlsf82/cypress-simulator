const { defineConfig } = require("cypress")

const cypressSplit = require("cypress-split")

module.exports = defineConfig({
  projectId: "ceuijm",
  viewportHeight: 1024,
  viewportWidth: 1700,
  e2e: {
    env: {
      grepOmitFiltered: true,
      grepFilterSpecs: true
    },
    fixturesFolder: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      cypressSplit(on, config)
      return config
    }
  },
})
