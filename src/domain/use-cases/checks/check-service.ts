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

// Tu caso de uso no tiene lógica específica de implementación para "qué hacer" en caso de éxito o error. Esto se delega a los callbacks, lo que hace que sea flexible y fácilmente extensible.
// Delegamos la logica de exito y error


export interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>
};


type SuccessCallback = () => void;
type ErrorCallback = ( error: string ) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback 
    ) {};

    async execute( url: string ): Promise<boolean> {

        try {
            const req = await fetch( url );
            if ( !req.ok ) {
                throw new Error(`Error on check service ${ url }`)
            }

            this.successCallback();
            return true

        } catch (error) {
            this.errorCallback(`${ error }`)
            return false;
        };
    };
};