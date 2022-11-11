/*11. Para generar el JWT importamos nuestra libreria jsonwebtoken */
const jwt = require('jsonwebtoken');


const generarJWT = ( uid = '' ) => {

    /*12. Utilizamos una promesa para devolver un resolve o un reject en caso de error */
    return new Promise( (resolve, reject) => {

        /*13. Establecemos el payload que sera la informacion extra que estara en nuestro jwt */
        const payload = { uid };

        /*14. Con el metodo sign() establecemos un nuevo token, a este metodo se le pasa como parametros, -> middlewares/validar-jwt.js
              el payload, se establece una llave privada que utilizara jwt para generar el token en base a esta llave
              Tambien se pueden mandar otras opciones como el tiempo en que queremos que expire el token
              Finalmente establecemos un callback el cual recibira los errores que haya y el token en caso de salir todo bien  */
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}

module.exports = {
    generarJWT
}

