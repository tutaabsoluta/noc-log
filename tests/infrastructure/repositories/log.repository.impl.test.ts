import { beforeEach } from 'node:test';
import { LogRepositoryImpl } from '../../../src/infrastructure/repositories/log.repository.impl';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';

describe('log.repository.impl.test.ts', () => { 

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    
    beforeEach( () => {
        jest.clearAllMocks()
    } );
    
    const logRepository = new LogRepositoryImpl(mockLogDatasource)
    
    
    test('saveLog should call the datasource with arguments', async () => { 
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'Test-message',
            origin: 'log-repository.impl.test.ts'
        });

        await logRepository.saveLog(log);

        expect( mockLogDatasource.saveLog ).toHaveBeenCalledWith( log )

    });
    test('getLogs should call the datasource with arguments', async () => { 
        await logRepository.getLogs(LogSeverityLevel.low);

        expect( mockLogDatasource.getLogs ).toHaveBeenCalledWith( LogSeverityLevel.low )
    });
});