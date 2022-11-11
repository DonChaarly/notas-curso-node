/*23. Se puede crear un middleware el cual verificara que el usuario tenga los roles correspondientes para hacer la peticion */
const { response } = require('express');


/*24. Se puede crear un middleware para verificar que el rol sea de tipo ADMIN */
const esAdminRole = ( req, res = response, next ) => {

    /*24. Este middleware debe ir si o si despues del middleware validarJWT ya que este graba el usuario en el request y aqui lo utilizamos
          Verificamos que este middleware se haya utilizado correctamente */
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    /*25. del usuario sacamos el rol y el nombre */
    const { rol, nombre } = req.usuario;
    
    /*26. Verificamos que el rol sea admin para poder seguir con la peticion */
    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    /*27. Finalmente utilizamos next() para seguir con la peticion */
    next();
}

/*28. Se puede crear otro middleware para verifica que el rol establecido pertenece a los tipos de roles pemitidos */
const tieneRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }


        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}