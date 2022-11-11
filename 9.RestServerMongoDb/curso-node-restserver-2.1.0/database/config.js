/*1. Para crear la conexion a la base de datos, es buena idea crear una carpeta llamada database y dentro el archivo config.js
     En este archivo se tendra la configuracion de conexion a la base de datos */
const mongoose = require('mongoose');

/*2. Se crea una funcion ascyn que se encargara de hacer la conexion a la base de datos */
const dbConnection = async() => {

    try {
        /*3. Para especificar la conexino a la base de datos se utiliza el metodo mongoose.connect()
             Se pasa como parametro el path de conexion a la base de datos 
             y objetos con propiedades que pide moongose */
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    
        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}

/*4. Se exporta la funcion de conexion a la base de datos --> models/server.js */
module.exports = {
    dbConnection
}
