const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        
        /*6. Se llama el metodo conectarDB para hacer las conexiones a base de datos -> models/usuario.js*/
        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    /*5. Para la conexion a base de datos se crea un metodo conectarDB
         este metodo podria a su vez llamar varios metodos de conexion a bases de datos definidos en la carpeta databaes
    */
    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
