// a capa de presentación (Server) controla cuándo y cómo se ejecuta el caso de uso CheckService. Además, usa el adaptador CronService para programar tareas repetitivas.

import { LogRepository } from "../domain/repository/log.repository";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"


// Crear instancia para mandarsela a los use-cases que ocupen el repo
const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

// En nuestro server start definimos los jobs
export class Server {

    public static start() {
        
        console.log('Server started...')

        CronService.createJob(
            '*/5 * * * * *',
            () => {

                const url = 'http://localhost:3000/';
                
                new CheckService(
                    fileSystemRepository,
                    () => console.log('Success'),
                    ( error ) => console.log(`${error}`)
                    
                ).execute( url );
            }
        );
    };
};


