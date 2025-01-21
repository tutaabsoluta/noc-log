import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service"


// En nuestro server start definimos los jobs
export class Server {

    public static start() {
        
        console.log('Server started...')

        CronService.createJob(
            '*/5 * * * * *',
            () => {

                const url = 'https://google.com';
                
                new CheckService(

                    () => console.log('Success'),
                    ( error ) => console.log(`${error}`)
                    
                ).execute( url );
            }
        );
    };
};


