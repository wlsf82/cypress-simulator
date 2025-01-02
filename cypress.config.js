const { defineConfig } = require("cypress")

const cypressSplit = require("cypress-split")

module.exports = defineConfig({
  projectId: "ceuijm",
  e2e: {
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
