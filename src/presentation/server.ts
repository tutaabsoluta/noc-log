import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/MongoLogDatasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/PostgresLogDatasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";


// Crear instancia para mandarsela a los use-cases que ocupen el repo
// const fileSystemRepository = new LogRepositoryImpl(
//     new FileSystemDatasource()
// );

// const mongoDbRepository = new LogRepositoryImpl(
//     new MongoLogDatasource()
// )

const mongoDbRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
)

const emailService = new EmailService();


export class Server {

    public static start() {
        
        console.log('Server started...')

        CronService.createJob(
            '*/5 * * * * *',
            () => {

                const url = 'https://googlasdfe.com/';
                
                new CheckService(
                    mongoDbRepository,
                    () => console.log('Success'),
                    ( error ) => console.log(`${error}`)
                    
                ).execute( url );
            }
        );

        // new SendEmailLogs(emailService, fileSystemRepository ).execute('538ser@gmail.com')

    };
};


