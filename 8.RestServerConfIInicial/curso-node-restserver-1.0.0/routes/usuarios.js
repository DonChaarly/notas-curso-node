
const { Router } = require('express');

/*7. Las rutas son los endpoints que tendra nuestra aplicacion,
     para un mejor manejo estos se pueden separar en diferentes archivos donde cada archivo tendra los paths de tareas especificas */
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

/*8. Se crea un obtejo Router */
const router = Router();

/*9. Se tiene varios metodos HTTP los mas comunes son el GET, PUT, POST, DELETE, PATCH --> controllers/usuarios.js
     Se recibe como primer parametro el path espedifico para el servicio y como segundo parametro se tiene un callback
     En este callback se especifica la respuesta y los parametros de entrada que se pueden recibir
     Es buena idea tener estos callback en otro archivo aparte en la carpeta de controllers */
router.get('/', usuariosGet );

/*18. Para establecer un path dinamico se coloca : seguido del nombre del parametro a recibir */
router.put('/:id', usuariosPut );

router.post('/', usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;