// La clase solo se encarga de revisar el servicio web
// Revisamos un servicio web
// Nuestros casos de uso son una clase. Es un codigo especializado en una tarea
// Retorna un promise boolean en caso de que el servicio este arriba o malo
// Nuestro caso de uso revisa cualquier URL, si no responde marca un error que queremos enviar a algun lugar
// ID: se deben proporcinar las dependencias para que el use-case funcione como se espera
// ID: que quiero hacer si el usecase falla o sucede
// private readonly para no cambiar el callback en la funcion
// Com ID separamos responsabilidades
// El caso de uso deberia recibir donde quiero grabar un log
// Mi usecase debe hacer uso de un tipo de patron para determinar donde grabar un log. Termina siendo otra ID
// La clase tiene dos parametros obligatorios
// los callbakcs de ID permite manejar el comportamiento de la clase y no es responsabilidad de la clase manejar esa implementacion

import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

// Tu caso de uso no tiene lógica específica de implementación para "qué hacer" en caso de éxito o error. Esto se delega a los callbacks, lo que hace que sea flexible y fácilmente extensible.
// Delegamos la logica de exito y error

// es normal que un caso de uso termine inyectando o implementando un repository
// use-case -> repository -> datasource

export interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>
};

// argumentos opcionales
type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback, 
    ) {};

    async execute( url: string ): Promise<boolean> {

        try {
            const req = await fetch( url );
            if ( !req.ok ) {
                throw new Error(`Error on check service ${ url }`)
            }

            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low );
            this.logRepository.saveLog( log );
            this.successCallback && this.successCallback();
            return true

        } catch (error) {
            const errorMessage = `${ url } is not ok. ${error}`
            const log = new LogEntity( errorMessage , LogSeverityLevel.high );
            this.logRepository.saveLog( log );
            this.errorCallback && this.errorCallback( errorMessage );
            return false;
        };
    };
};