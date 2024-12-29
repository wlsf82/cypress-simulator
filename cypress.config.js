const { defineConfig } = require("cypress")

module.exports = defineConfig({
  projectId: "ceuijm",
  e2e: {
    fixturesFolder: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
})
