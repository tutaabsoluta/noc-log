// LogDatasource: se definen las acciones que se pueden realizar con logs en el contexto de Bases de Datos

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

// Reglas de negocio para los Datasources
// tiene los origenes de datos, de donde tomamos los datos
// Un contrato que tienen que cumplir todos mis datasources

export abstract class LogDatasource {
    abstract saveLog( log:LogEntity ): Promise<void>
    abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>
};

// no se pueden crear instancias de clases abstractas
// sirve para obligar el comportamiento definido de un datasource sobre otras clases
// cualquier origen de datos debe implementar el saveLog

//  Los métodos abstractos dentro de una clase abstracta actúan como "contratos" que las clases derivadas están obligadas a implementar.