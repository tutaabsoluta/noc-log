import { CheckServiceMultiple } from '../../../../src/domain/use-cases/checks/check-service-multiple'
import { LogEntity } from '../../../../src/domain/entities/log.entity';


describe('check-service-multiple.test.ts', () => {


    // Mock repos
    const mockRepository1 = {
        getLogs: jest.fn(),
        saveLog: jest.fn(),
    };
    const mockRepository2 = {
        getLogs: jest.fn(),
        saveLog: jest.fn(),
    };
    const mockRepository3 = {
        getLogs: jest.fn(),
        saveLog: jest.fn(),
    };

    const repositories = [
        mockRepository1,
        mockRepository2,
        mockRepository3,
    ];

    // Mock functions
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckServiceMultiple([mockRepository1, mockRepository2, mockRepository3], successCallback, errorCallback)


    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call success callback when fetch returns true', async () => {
        const wasOk = await checkService.execute('https://google.com');

        expect(wasOk).toBeTruthy();

        //The callbacks have to be called
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        // The saveLog method have to be called with the entity
        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))


        
    })

    test('should call error callback when fetch returns false', async () => {

        const wasOk = await checkService.execute('https://googleasdfasfd.com');

        expect(wasOk).toBeFalsy();

        // The callbacks have to be called
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();


        // The saveLog method have to be called with the entity
        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })
})