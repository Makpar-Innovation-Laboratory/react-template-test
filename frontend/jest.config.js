//
// Jest configuration & settings
//

module.exports = {
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tools/assetsTransformer.js",
    "\\.(css)$": "<rootDir>/tools/assetsTransformer.js",
    "\\.(sass|scss)$": "identity-obj-proxy",
    "^react-native$": "react-native-web"
  },
  "setupFiles": [
    "raf/polyfill",
    "./tools/enzymeTestAdapterSetup.js"
  ],
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,mjs}"
  ],
  "coverageDirectory": "reports/istanbul-coverage",
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}",
  ],
  "testEnvironment": "jsdom",
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"
  ],
  "watchPathIgnorePatterns": [
    // Cypress-based automation/E2E tests Jest doesn't need to worry about
    "<rootDir>/cypress/",

    // Because we launch Jest from scripts that effectively pull jest from
    // node_modules there appears to be something in there that's re-triggering
    // the tests in watch mode, upwards of 8x before settling. Ignoring the folder
    // in watch mode solves this.
    "<rootDir>/node_modules",
  ],
  "moduleFileExtensions": [
    "web.js",
    "js",
    "json",
    "web.jsx",
    "jsx",
    "node",
    "mjs"
  ],
  "globals": {}
};
