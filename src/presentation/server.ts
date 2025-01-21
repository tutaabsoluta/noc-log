import { CronService } from "./cron/cron-service"


// En nuestro server start definimos los jobs
export class Server {

    public static start() {
        console.log('Server started...')

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                console.log('cron executed after 5 seconds')
            }
        );
    };
};


