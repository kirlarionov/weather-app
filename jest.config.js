/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
   preset: "ts-jest",
   testEnvironment: "node",
   //transformIgnorePatterns: ["node_modules/(?!(axios))"],
   transform: {
      "^.+\\.ts?$": "ts-jest",
   },
   transformIgnorePatterns: ["weather-app/node_modules/"],
}
