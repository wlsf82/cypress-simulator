const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    fixturesFolder: false,
    supportFile: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});
