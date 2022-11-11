/*3. Se crea el archivo auth.js dentro de la carpeta routes, en donde se definiran las rutas para la autenticacion */
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { login } = require('../controllers/auth');


const router = Router();

/*4. Se establecen las rutas a llamar, los callback estaran en la carpeta de controllers -> controllers/auth.js */
router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );



module.exports = router;