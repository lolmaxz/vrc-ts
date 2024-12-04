import type { Config } from 'jest';

const config: Config = {
    // moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['./jest.setup.js'],
};

export default config;
