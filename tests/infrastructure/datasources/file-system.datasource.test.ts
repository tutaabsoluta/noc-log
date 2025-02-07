import fs from 'fs'
import path from 'path';
import { FileSystemDatasource } from '../../../src/infrastructure/datasources/file-system.datasource'
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';


describe('file-system.datasource.ts', () => { 

    const logPath = path.join(__dirname, '../../../logs')

    beforeEach(() => {
        fs.rmSync( logPath, { recursive: true, force: true } );
    })
    test('should create log files if they dont exist', () => { 
        new FileSystemDatasource();

        const files = fs.readdirSync(logPath)
        console.log(files)
        expect( files ).toEqual([
            'logs-all.log', 'logs-high.log', 'logs-medium.log' ]
        )
     });


     test('should save a log in logs-all.log', () => { 
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'Test message',
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')


        expect( allLogs ).toContain(JSON.stringify(log))

      });

     test('should save a log in logs-medium.log', () => { 
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'Test message',
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);

        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8')
        expect( mediumLogs ).toContain(JSON.stringify(log))

      });


     test('should save a log in logs-high.log', () => { 
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'Test message',
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);

        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8')
        expect( highLogs ).toContain(JSON.stringify(log))

      });

      test('should return all the logs', async () => { 
        const logDatasource = new FileSystemDatasource();

        const logLow = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'Test message',
            origin: 'file-system.datasource.test.ts'
        });

        const logMedium = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'Test message',
            origin: 'file-system.datasource.test.ts'
        });

        const logHigh = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'Test message',
            origin: 'file-system.datasource.test.ts'
        });

        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(logMedium);
        await logDatasource.saveLog(logHigh);

        const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);


        expect( logsLow ).toEqual( expect.arrayContaining([ logLow, logMedium, logHigh ]) );
        expect( logsMedium ).toEqual( expect.arrayContaining([ logMedium ]) );
        expect( logsHigh ).toEqual( expect.arrayContaining([ logHigh ]) );

       });

 });