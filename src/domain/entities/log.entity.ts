// entidad: algo que va a llegar a la base de datos.Lo que grabamos en BD pero no es la BD. Quien gobierna la app cuando trabajamos con las entidades

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
};

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
};


export class LogEntity { 

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions ) {
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    };

    // Crear instancias LogEntity basado en un JSON
    static fromJson = ( json: string ):LogEntity => {

        const { message, level, createdAt, origin } = JSON.parse(json)
        
        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin,
        });

        return log;
    }

};