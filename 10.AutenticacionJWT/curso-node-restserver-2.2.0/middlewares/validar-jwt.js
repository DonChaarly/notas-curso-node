/*15. Para validar que las peticiones al backend esten autorizados haciendo uso del token
      se puede crear un middleware que interceptara las peticiones y validara esto */
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async( req = request, res = response, next ) => {

    /*16. Recuperamos el token que debera estar dentro de las cabeceras de la peticion asignado como x-token, 
          este nombre puede ser el que queramos */
    const token = req.header('x-token');

    /*17. Verificamos que nos hayan enviado un webToken */
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        /*18. Con el metodo verify(), verificamos que el token mandado sea valido y este creado con nuestra secret key
              pasamos como parametros el token y la llave secreta
              en caso de ser correcto nos retornara los payloads
              en caso de no ser correcto se lanzara un error que nos enviara al catch */
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        /*19. Recuperamos nuestro usuario de la base de datos, en este caso se esta utilizando mongodb, pero se debe adaptar a la db que se utilice */
        const usuario = await Usuario.findById( uid );
        
        /*20. Verificamos si el usuario existe y si esta activo */
        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }
        
        /*21. podemos guardar lo que sea en la request la cual podra ser accedida desde el controlador */
        req.usuario = usuario;
        /*22. Finalmente usamos el metodo next() para seguir al siguiente middleware -> middlewares/validar-roles.js */
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}