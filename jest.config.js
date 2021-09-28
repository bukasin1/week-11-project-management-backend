/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ["./node_modules"],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ["ts", "js"]
};
