//1. Para crear **servidores http** con solo node se utiliza la **libreria http**
const http = require('http');

/*2. Lo primero es crear un servidor, en este se estalece el puerto en el que se estara escuchando en el listen
     Se tienen los parametros req y res, con req es lo que el usuario nos mandar y res para indicar que mandaremos
 */
http.createServer((req, res) => {

        
        //5. Con res.writeHead se colocan los cabeceros de repuesta que se van a mandar como parte de la peticion
        res.writeHead(200, { 'Content-Type': 'application/json' });

        let salida = {
            nombre: 'fernando',
            edad: 32,
            url: req.url
        }

        //3. Para mandar algo se coloca res.write
        res.write(JSON.stringify(salida));
        //4. Se tiene que especificar el res.end() para indicar que ya se termino de escribir la respuesta -> server.js
        res.end();

    })
    .listen(8080);


console.log('Escuchando el puerto 8080');