import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

// Repository: recibimos algun tipo de datasource y llamamos sus metodos
// Hacemos una inyeccion de una dependencia. Inyectamos el datasource

export class LogRepositoryImpl implements LogRepository {

    constructor(
        // esto es equivalente a recibirlo como argumento y establecer la entidad
        private readonly logDataSource: LogDatasource // puedo cambiar esto por cualquier DataSource
    ){}


    async saveLog(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLog( log )
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs( severityLevel )
    }

};