import { Server } from "./presentation/server";


( async () => {
    await main()
})();

function main() {
    Server.start()
};

// JSON Server sirve para hacer prototipos de apis o pruebas

// Al repositorio le podemos conectar diferentes Remote Data Sources. Puede haber uno que se conecte a un web service, otro que se conecte a SQL
// Esos datasources son consumidos por el repositorio
// El repositorio se comunica con los use-cases
// El caso de uso tiene la inyeccion del repositorio y el repositorio sabe cual datasource se va a conectar

// Domain: logica de negocio: como funciona, que tipos de datos, reglas de negocio
// Datasource: origne de datos, de donde tomaremos los datos
// Repository: como vamos a mandar a llamar nuestro datasource

// domain: las reglas de como funciona, no hacemos implementaciones. Creamos clases abstractas que nos permiten poner las reglas de como queremos que funcionen los origenes de datos