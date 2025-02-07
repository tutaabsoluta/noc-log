
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity'

describe('logs.entity.ts', () => { 

    const dataObj = {
        level: LogSeverityLevel.low,
        message:'Test message',
        origin: 'log.entity.test.ts'
    };

    const log = new LogEntity( dataObj );

    test('should create a LogEntity instance', () => { 
        expect( log ).toBeInstanceOf( LogEntity );
    });
    
    test('log should have the correct properties', () => {
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.createdAt ).toBeInstanceOf(Date);
      });


      test('should create a LogEntity instance fromJson', () => { 
        const json = `{"message":"Service https://google.com/ working","level":"low","createdAt":"2025-02-03T15:16:40.417Z","origin":"check-service.ts"}`;

        const log = LogEntity.fromJson(json);

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( "Service https://google.com/ working" );
        expect( log.level ).toBe( "low" );
        expect( log.origin ).toBe( "check-service.ts" );
        expect( log.createdAt ).toBeInstanceOf( Date );

       });

       test('should create a LogEntity instance fromObject', () => { 
        const log = LogEntity.fromObject(dataObj);

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.createdAt ).toBeInstanceOf(Date);
        });
 });