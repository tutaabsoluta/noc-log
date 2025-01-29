// a capa de presentación (Server) controla cuándo y cómo se ejecuta el caso de uso CheckService. Además, usa el adaptador CronService para programar tareas repetitivas.

import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";


// Crear instancia para mandarsela a los use-cases que ocupen el repo
const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

const emailService = new EmailService();


// En nuestro server start definimos los jobs
export class Server {

    public static start() {
        
        console.log('Server started...')

        CronService.createJob(
            '*/5 * * * * *',
            () => {

                const url = 'https://google.com/';
                
                new CheckService(
                    fileSystemRepository,
                    () => console.log('Success'),
                    ( error ) => console.log(`${error}`)
                    
                ).execute( url );
            }
        );

        new SendEmailLogs(emailService, fileSystemRepository ).execute('538ser@gmail.com')
    };
};


// Las dependencias son inyectadas en los casos de uso o en los servicios