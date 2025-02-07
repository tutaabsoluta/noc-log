import { envs } from '../../src/config/plugins/envs.plugin';

describe('envs.plugin.test.ts', () => { 
    test('should return env options', () => { 
        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: '538ser@gmail.com',
            MAILER_SECRET_KEY: 'zdkfdeikofhhjkli',
            PROD: true,
            MONGO_URL: 'mongodb://sergio:123456789@localhost:27017/',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_DB_USER: 'sergio',
            MONGO_DB_PASS: '123456789'
        })
     });

     test('should return error if the env is not found', async () => { 
        // Reset the modules to put the new env
        jest.resetModules();
        process.env.PORT = 'ABC';
        
        try {
            await import('../../src/config/plugins/envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${ error }`).toContain('"PORT" should be a valid integer')
        }
      });
 });