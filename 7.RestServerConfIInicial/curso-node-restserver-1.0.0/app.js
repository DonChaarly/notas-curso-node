
require('dotenv').config();

/*5. En el archivo principal se importa nuestra clase server 
     y solo se necesita crear una instancia del servidor
     y lanzar el metodo listen */
const Server = require('./models/server');


const server = new Server();



server.listen();