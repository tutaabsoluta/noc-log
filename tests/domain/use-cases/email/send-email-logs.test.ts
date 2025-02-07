import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../../src/domain/repository/log.repository';
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-email-logs'
import { EmailService } from '../../../../src/presentation/email/email.service';

//Test if the service was called, if the execute was succesfull, if the saveLog was called with an entity
describe('send-email-log.test.ts', () => { 

    // Mock use-case arguments
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    }

    const mockLogsRespository: LogRepository = {
        getLogs: jest.fn(),
        saveLog: jest.fn(),
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogsRespository
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call sendEmail and sendLog', async () => { 

        const result = await sendEmailLogs.execute('538ser@gmail.com')

        expect( result ).toBeTruthy();
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
        expect( mockLogsRespository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) )
     });

    test('should log in case of error', async () => { 

        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        const result = await sendEmailLogs.execute('538ser@gmail.com')

        const log = {
            createdAt: expect.any(Date),
            level: 'high',
            message: 'Error: Email log not sent',
            origin: 'send-email-logs.ts'
        }

        expect( result ).toBeFalsy();
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
        expect( mockLogsRespository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) )
        expect( mockLogsRespository.saveLog ).toHaveBeenCalledWith(log)

     });

 }) ;