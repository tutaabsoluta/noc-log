// entidad: algo que va a llegar a la base de datos.Lo que grabamos en BD pero no es la BD. Quien gobierna la app cuando trabajamos con las entidades

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
};


export class LogEntity { 

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogSeverityLevel ) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    };

    // Crear instancias LogEntity basado en un JSON
    static fromJson = ( json: string ):LogEntity => {

        const { message, level, createdAt } = JSON.parse(json)
        
        const log = new LogEntity( message, level );

        log.createdAt = new Date( createdAt );

        return log;
    }

};