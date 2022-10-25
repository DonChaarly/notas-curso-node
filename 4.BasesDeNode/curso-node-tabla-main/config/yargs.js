//5. El paqauete yargs nos sirve para **administrar las banderas y los valores que pueden tomar
const argv = require('yargs')
//6. Para especificar una bandera y su abrebiacion, asi como mas especificaciones, se utiliza la funcion option()
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Es la base de la tabla de multiplicar'
    })
    .option('h', {
        alias: 'hasta',
        type: 'number',
        default: 10,
        describe: 'Este es el número hasta donde quieres la tabla'
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        default: false,
        describe: 'Muestra la tabla en consola'
    })
    //7. Para checar que no hay errores en las banderas se utiliza la funcion check()
    .check( (argv, options) => {
        //8. Dentro se pueden hacer todas las verificaciones pertinentes
        if( isNaN( argv.b ) ){
            throw 'La base tiene que ser un número'
        }
        //9. Si no se tiene ningun error se debe regresar true -> multiplicar.js
        return true;
    })
    .argv;


module.exports = argv;