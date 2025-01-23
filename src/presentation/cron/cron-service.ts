// Usar una clase aporta organizacion, escalabilidad y flexibilidad
// Agrupar funciones, reutilizar codigo, extensibilidad
// Tu capa de presentación utiliza esta abstracción y no depende directamente del paquete cron. Esto da flexibilidad.

import { CronJob } from 'cron';

export type CronTime = string | Date;
export type OnTick = () => void;

export class CronService {

    static createJob( cronTime: CronTime, onTick: OnTick ): CronJob {
        
        const job = new CronJob( cronTime, onTick );

        job.start();

        return job;
    };
};


