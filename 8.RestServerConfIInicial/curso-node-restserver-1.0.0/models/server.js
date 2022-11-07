const express = require('express');
const cors = require('cors');

/*1. dentro de esta clase se tiene funciones y variables para la configuracion del server */
class Server {

    /*2. Dentro del constructor se inicializan las variables del server
         como el app, el puerto en el que se escucha y la ruta inicial del api
         Tambien se colocan los metodos que se creen para que se configuren las rutas al crear una instancia de esta clase */
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    /*5. Los middlewares son funciones que siempre se ejecutaran cuando se levante el servidor 
         Para crear los middlewares se utiliza el metodo use*/
    middlewares() {

        /*13. El **CORS** se utiliza para especificar que clientes pueden acceder a los endpoints de nuestro backend*/
        this.app.use( cors() );

        /*15. Para indicar que la informacion proporcionada por el cliente sera de tipo json se utiliza el siguiente middleware -> controllers/usuario.js */
        this.app.use( express.json() );

        /*6. Con express.static se indica cual sera la carpeta public que se utilizara --> usuarios.js */
        this.app.use( express.static('public') );

    }

    /*3. Dentro del metodo routes se tendran las configuraciones de las rutas */
    routes() {
        /*14. Para utilizar las rutas de un archivo se utiliza el metodo use
              al que se le pasa el path inicial y las rutas definidas 
        */
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    /*4. Se crea tambien un metodo listen que es el encargado de levantar el servidor --> app.js*/
    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
