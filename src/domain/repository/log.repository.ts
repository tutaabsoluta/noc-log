// Repository: como mandamos a llamar al Datasource.No llegamos directamente al datasource
// En domain solo son las reglas, aqui no se hace la implementacion.

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

// No queremos crear instancias directamente
export abstract class LogRepository {
    abstract saveLog( log:LogEntity ): Promise<void>
    abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>
};

// Diferencia con el datasource: cuadno estemos haciendo las implementaciones de ambos. El logRepo permite poder llamar metodos dentro del Datasource, porque no llegamos directo al repositorio

// permitira llamar metodos que se encuentran en el Datasource porque no llegamos directamente al datasource, lo hacemos dentro del repositorio.

// El repository permitira llamar al datasource por eso tiene los mismos metodos