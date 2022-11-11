
const { Schema, model } = require('mongoose');

/*7. Para crear modelos de las tablas que se tiene en la base de datos en MongoDb
     Se utiliza la clase Schema, a la cual se le coloca la estructura que tiene la tabla en la base de datos */
const UsuarioSchema = Schema({
    /*8. A cada columna se le especifica el tipo de dato asi como tambien se pueden indicar validaciones -> controllers/usuarios.js
         como indicar que el campo es obligatorio o si debe ser unico, asi como una lista de valores aceptados
         o valores por defecto */
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});



UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario  } = this.toObject();
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );
