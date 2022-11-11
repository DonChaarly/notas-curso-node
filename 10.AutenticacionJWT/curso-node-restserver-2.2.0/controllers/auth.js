/*5. Los callback a llamar en las rutas se estableceran en el controlador especifico para auth */
const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');


/*6. Se define el callback principal para hacer el login */
const login = async(req, res = response) => {

    //7. Recuperamos el correo y password del body de la peticion
    const { correo, password } = req.body;

    try {
      
        /*8, Hacemos la comprobaciones como que el usuario existe con uso del correo 
             o que el usuario este activo
             y que la contrasena sea correcta 
        
        */
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            //9. no pasar validaciones enviamos un status 400 con el mensaje especifico
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        //10. Mandamos a llamar el metodo generarJWT que establecimos en los helpers -> helpers/generar-jwt.js
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}



module.exports = {
    login
}
