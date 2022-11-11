const { validationResult } = require('express-validator');


//17. Se pueden crear middlewares pesonalizados los cuales se ejecutaran antes de que se lleve a cabo el controlador
//18. Un middleware obligado es el de validacion de campos que enviara error en caso de que una validacion de express-validator no haya pasado
const validarCampos = ( req, res, next ) => {

    //19. Se recuperan los errores con validationResult y se regresa el error en caso de haber alguno
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    //20. Si no hay errores se coloca la funcion next para proceguir con el servicio -> routes/usuarios.js
    next();
}



module.exports = {
    validarCampos
}
