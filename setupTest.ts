// To use env var for testing create this file and config the setup files of the jest.config with "<rootDir>/setupTest.ts"

import { config } from 'dotenv';
config({
    path: '.env.test'
});