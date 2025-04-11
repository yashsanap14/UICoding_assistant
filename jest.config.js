module.exports = {
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  
  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/test/**/*.test.js"
  ],
  
  // An array of regexp pattern strings that are matched against all test paths, skipped tests
  testPathIgnorePatterns: [
    "/node_modules/",
    "/test/ui.test.js" // Skip Selenium tests by default as they require a running server
  ],
  
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  
  // A list of paths to modules that run some code to configure or set up the testing framework
  setupFilesAfterEnv: [],
  
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  
  // A map from regular expressions to module names that allow to stub out resources
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
  }
}; 