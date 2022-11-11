const { response, request } = require('express');
/*12. Para encryptar y desencriptar contrasenas se puede utilizar la libreria bcryptjs */
const bcryptjs = require('bcryptjs');

/*9. Para crear instancias de nuestras clases modelos primero importamos el schema */
const Usuario = require('../models/usuario');



const usuariosGet = async(req = request, res = response) => {

    /*27. Para obtener todos los elementos de una tabla de forma paginada se hace lo siguiente
          El usurio nos puede mandar los parametros de limite y el numero de registros a omitir, 
          esto lo sacaremos de req.query y le colocamos valores por default */
    const { limite = 5, desde = 0 } = req.query;
    /*30. A los metodos de recuperacion de mongoose se les puede colocar condiciones para recuperar solo
          los registros que cumplan con la condicion,
          como que la columna estado del registro sea true */
    const query = { estado: true };

    /*31. Podemos utilizar una Promise.all para hacer el await de todos las recuperaciones que necesitemos en vez de hacer await por cada una */
    const [ total, usuarios ] = await Promise.all([

        /*29. El metodo countDocuments nos devuelte el numero total de registros que tenemos en la tabla */
        Usuario.countDocuments(query),
        /*28. con el metodo find recuperamos todos los registros de una tabla
              con el metodo limit establecemos un limite de registros que queremos recuperar, 
              con skip establecemos el numero de registros a omitir
              se tienen que castear a Number los valores para no obtener un error */
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    /*32. Finalmente regresamos en un json nuestros valores */
    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {
    
    
    /*11. Debido a que el cliente nos puede mandar mas de la informacion que necesitamos dentro del body, 
    hacemos una desestructuracion de los campos que necesitamos  */
    const { nombre, correo, password, rol } = req.body;
    /*10 Utilizando nuestro schema podemos crear nuevos objetos de las clases Modelo */
    const usuario = new Usuario({ nombre, correo, password, rol });

    /*13. Para enctryptar una contrasena se hace uso de los siguientes metodos -> routes/usuarios.js */
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    /*25. Para actualizar un elemento de la base de datos de mongodb se tiene que tener a consideracion lo siguiente
          Se debe pasar al meno el id para identificar el elemento
          se puede desestrucutrar los datos para hacer valiidaciones a parte
          sacamos el _id porque este lo genera mongodb y chocara con nuestro campo id
          Se debe volver a encryptar la contrasena si es que nos paso una nueva contrasena */
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    /*26. El metodo findByIdAndUpdate nos ayuda a actualizar los datos de un elemento en mongodb */
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    /*33. Para eliminar un elemento necesitamos al menos el id */
    const { id } = req.params;

    /*34. El metodo findByIdAndDelete elimina por completo el elemento en la base de datos */
    // const usuario = await Usuario.findByIdAndDelete( id );

    /*34. Podriamos querer mantener el registro y solo cambiar el estado a false con el findByIdAndUpdate*/
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );


    res.json(usuario);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}