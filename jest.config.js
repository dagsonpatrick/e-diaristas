module.exports = {
    testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/.next'],
    moduleDirectories: ['node_modules', 'src'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js']
}