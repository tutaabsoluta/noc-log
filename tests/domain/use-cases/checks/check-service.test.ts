import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../../src/domain/repository/log.repository';
import{ CheckService } from '../../../../src/domain/use-cases/checks/check-service'

// Test the dependencies (repository, callbacks) and the fetch
describe('check-service.test.ts', () => { 


    // Mock repository
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    // Mock functions
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService( 
        mockRepository, 
        successCallback, 
        errorCallback 
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call success callback when fetch returns true', async () => { 

        const wasOk = await checkService.execute('https://google.com');

        expect( wasOk ).toBeTruthy();

        // The callbacks have to be called
        expect( successCallback ).toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        // The saveLog method have to be called with the entity
        expect( mockRepository.saveLog ).toHaveBeenCalledWith(
            expect.any( LogEntity )
        )
     });

    test('should call error callback when fetch returns false', async () => { 

        const wasOk = await checkService.execute('https://googleasdfasfd.com');

        expect( wasOk ).toBeFalsy();

        // The callbacks have to be called
        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).toHaveBeenCalled();

     });
 });