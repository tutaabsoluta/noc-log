import {LogModel, MongoDatabase} from '../../../src/data/mongo/index'
import { envs } from '../../../src/config/plugins/envs.plugin'
import mongoose from 'mongoose';
import { MongoLogDatasource } from '../../../src/infrastructure/datasources/MongoLogDatasource'
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { prototype } from 'events';

// Test if a log is created and the get logs funcion
describe('mongo-log.datasource.test.ts', () => { 
    
    beforeAll( async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });
    });

    // delete all from the DB
    afterEach( async () => {
        await LogModel.deleteMany()
    })
    
    // close the DB connection
    afterAll( async () => {
        mongoose.connection.close()
    });

    // Datasource instance
    const logDataSource = new MongoLogDatasource();
    
    // log instance
    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Test message',
        origin: 'mongo-log.datasource.test.ts'
    })

    test('should create a log', async () => { 

        const logSpy = jest.spyOn(console, 'log');

        await logDataSource.saveLog(log);

        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith("Mongo log created");
     });


     test('should get logs', async () => { 

        await logDataSource.saveLog(log);
        await logDataSource.saveLog(log);
        await logDataSource.saveLog(log);

        const logs = await logDataSource.getLogs( LogSeverityLevel.low );

        expect( logs.length ).toBe(3);
        expect( logs[0].level ).toBe(LogSeverityLevel.low);

      });
 });