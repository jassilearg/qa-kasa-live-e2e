const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  setupNodeEvents(on, config) {
    // plugins
  },
  e2e: {
    baseUrl: "https://www.kasa.live/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
