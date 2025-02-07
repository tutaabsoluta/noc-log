import { LogDatasource } from '../../../src/domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';


// The abstract class should implements the interface
describe('log.datasource.test.ts', () => { 
    
    
    const newLog = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Test message',
        origin: 'datasource.test.ts',
        
    })
    
    class MockLogDatasource implements LogDatasource {
        
        async saveLog(log: LogEntity): Promise<void> {
            return
        }
        
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }
        
    }
    
    test('should test the abstract class', () => { 
        
        const mockLogDatasource = new MockLogDatasource();

        expect( mockLogDatasource ).toBeInstanceOf( MockLogDatasource );
        
    });
    
    test('should have the getLog and saveLog functions', async () => { 
        const mockLogDatasource = new MockLogDatasource();
        
        await mockLogDatasource.saveLog(newLog)
        expect( mockLogDatasource ).toHaveProperty( 'saveLog' );
        expect( typeof mockLogDatasource.getLogs ).toBe( 'function' );

        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high)

        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf( LogEntity );

      })
 });