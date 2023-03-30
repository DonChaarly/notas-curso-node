const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        //1. Para crear un servidor webSocket se necesita primer implmementar las siugientes dos lineas
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server, {
            cors:{
                origin: "http://localhost:3000"
            }
        } );

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        /*
            2. Al trabajar con webSockets no se tiene rutas como tal, a estas se les llama eventos de socket
               entonces es buena idea crear un nuevo controlador para estos eventos
        */
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        // this.app.use( this.paths.auth, require('../routes/auth'));
        
    }

    //3. En este metodo especificaremos todos los controlladores de los web Sockets
    sockets() {

        //4. Utilzamos nuestro objeto io para especificar el controlador que se ejecutara al ejecutarse algun evento, en este caso la conexion
        //5. como primer parametro se tendra el nombre del evento, como segundo parametro se tiene un callback que recibe como parametro el objeto io -> public/js/socket-client.js
        this.io.on('connection', socketController );

    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;