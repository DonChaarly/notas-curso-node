//3. Utilizamos OAuth2 para realizar la autenticacion del cliente
const { OAuth2Client } = require('google-auth-library');

//4. Pasamos nuestro id_cliente de google el cual lo colocamos en las variables de entorno 
const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

//5. Creamos el metodo googleVerify el cual retornara el nombre, imagen y email del usuario google  -> controllers/auth.js
const googleVerify = async( idToken = '' ) => {

  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  const { name: nombre, 
          picture: img, 
          email: correo
        } = ticket.getPayload();
  
  return { nombre, img, correo };

}


module.exports = {
    googleVerify
}