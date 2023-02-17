/* eslint-disable */

const esModules = [
  '@factly/scooter-core',
  "@factly/scooter-ui",
  "@factly/scooter-bubble-menu",
  "@factly/scooter-shared-utils",
  "@factly/scooter-embed",
  "@factly/scooter-fixed-menu",
  "@factly/scooter-image",
  "@factly/scooter-slash-commands",
  "@factly/scooter-code-block",
]
module.exports = {
  displayName: "test",
  preset: "../../jest.preset.js",
  transform: {
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "@nrwl/react/plugins/jest",
    "^.+\\.[tj]sx?$": ["babel-jest", {presets: ['@nrwl/react/babel']}],
  },
  allowJs: true,
  transformIgnorePatterns: [`node_modules/(?!.*.mjs$)`, 'node_modules/(?!.*.[tj]s$)',],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/apps/test",
};
