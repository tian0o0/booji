module.exports = {
  collectCoverage: true,
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["js", "ts"],
  testEnvironment: "jsdom",
  testMatch: ["**/*.test.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.json",
      diagnostics: false,
    },
  },
};
