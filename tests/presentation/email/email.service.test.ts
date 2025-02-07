import { EmailService,SendMailOptions } from '../../../src/presentation/email/email.service'
import nodemailer from 'nodemailer';

describe('email.service.test.ts', () => { 

    const mockSendMail = jest.fn();

    // createTransport mock
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })
    
    const emailService = new EmailService();

    test('should send an email', async () => { 

        
        const options: SendMailOptions = {
            to: '538ser@gmail.com',
            subject: 'Test',
            htmlBody: `<p>Test</p>`,
        };

        await emailService.sendEmail(options);

        expect( mockSendMail ).toHaveBeenCalledWith({
              "attachments": expect.any(Array),
              "html": "<p>Test</p>",
              "subject": "Test",
              "to": "538ser@gmail.com",
            });
     });

     test('should email with attachments', async () => { 

        const email = '538ser@gmail.com';
        await emailService.sendEmailWithFileSystemLogs(email)
        expect( mockSendMail ).toHaveBeenCalledWith({
            to: email,
            subject: 'Logs del servidor',
            html: expect.any( String ),
            attachments: expect.arrayContaining([
                {fileName: 'logs-all.log', path: './logs/logs-all.log'},
                {fileName: 'logs-high.log', path: './logs/logs-high.log'},
                {fileName: 'logs-medium.log', path: './logs/logs-medium.log'},
            ])
        })
      });
 });