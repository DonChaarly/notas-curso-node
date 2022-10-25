//1. Para poder acceder al FyleSystem se tiene que importar el paquete fs
const fs = require('fs');
//10. El paquete de colors nos permite colorear nuestras impresiones en la consola
const colors = require('colors');

const crearArchivo = async( base = 5, listar = false, hasta = 10 ) => {

    try {

        let salida  = '';
        let consola = '';
        
        for( let i = 1; i <= hasta; i++ ) {
            salida  += `${ base } x ${ i } = ${ base * i }\n`;
            consola += `${ base } ${ 'x'.green } ${ i } ${ '='.green } ${ base * i }\n`;
        }

        if ( listar ) {
            //11. Para colorear un string se le coloca . y el color que queremos que se coloree
            console.log('===================='.green);
            console.log('   Tabla del:'.green, colors.blue( base ) );
            console.log('===================='.green);

            console.log(consola);
        }
        
        /*2. Nuestra contante tiene muchisimos metodo, con writeFileSync se escribe o sobreescribe un archivo
             El primer argumento es la ruta y nombre del archivo a crear
             el Segundo argumento es lo que se va a escribir dentro del archivo
             
        */
        fs.writeFileSync( `./salida/tabla-${ base }.txt`, salida );


        return `tabla-${ base }.txt`;
        
    } catch (err) {
        throw err;
    }



}

/*3. Para exportar algo se coloca la siguiente sintaxys, -> app.js
      mediante un objeto se especifica el nombre de la propiedad y el valor que tendra
*/
module.exports = {
    crearArchivo
}