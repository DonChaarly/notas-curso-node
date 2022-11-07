const { response, request } = require('express');

/*10. Dentro de controllers se tendran los callback que se ejecutaran al llamar un servicio
      En estos se especifica el tipo de respuesta, y los parametros que se deben mandar junto con la peticion */
const usuariosGet = (req = request, res = response) => {

    //16. Para desestrucutrar la informacion que viene como query params en el path
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    //11. para especificar que el tipo de respuesta sera un json, se utiliza el metodo json({})
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
}

const usuariosPost = (req, res = response) => {

    //17. Para desestrucutrar la inforamcion que viene dentro del body en la peticion -> routes/usuarios.js
    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - usuariosPost',
        nombre, 
        edad
    });
    //12. Con el metodo status se especifica el codigo de estado que se va a mandar junto con la respuesta --> server.js
    res.status(400).json({
        msg: "Bad request"
    })

}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}