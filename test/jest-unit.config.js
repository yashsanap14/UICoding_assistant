/**
 * Jest configuration for unit tests only (no Selenium UI tests)
 */

module.exports = {
  // Extend the base Jest configuration
  ...require('../jest.config.js'),
  
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  
  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/test/basic.test.js",
    "**/test/templates.test.js"
  ],
  
  // Explicitly exclude UI tests that require a running server
  testPathIgnorePatterns: [
    "/node_modules/",
    "/test/ui.test.js",
    "/test/llm-ui.test.js"
  ],
  
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  
  // A list of paths to modules that run some code to configure or set up the testing framework
  setupFilesAfterEnv: [],
  
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage/unit"
};