

# Web Sockets o Sockets

Nota: el primer comentario en el proyecto esta en models/server.js

Los webSockets nos sirven para que al hacer alguna modificacion en la base de datos este socket notifique inmediatamente\
al cliente, y nosostros hagamos lo que tengamos que hacer con la informacion\
tambien podemos ser notificados en cuanto un cliente se desconecte o desconecte del socket

## Instalaciones necesarias

### En servidor node

Para implementar los sockets en nuestro servidor node se utiliza la libreria socket.io la cual es como express,\
esta libreria nos facilita la implementacion de sockets al igual que lo hace express con nuestras rutas rest

Instalamos socket.io
```
npm i socket.io
```

### En cliente react, vue, etc..

Para conectarse al servidor socket y manejar los eventos socket es necesario instalar la libreria socket.io-client\
```
npm i socket.io-client
```
Nota: si el cliente se maneja en el mismo servidor basta con la libreria socket.io

## Configuracion inicial para implementar socket.io en el servidor

En nuestro archivo server en donde creamos la conexion con expres\
en el contructor agregaremos las siguientes lineas\
Para crear un servidor webSocket se necesita primero implementar las siguientes dos lineas
```javascript
this.server = require('http').createServer( this.app );
this.io     = require('socket.io')( this.server );
```

Podemos implmentar un metodo el cual llamaremos en el constructor tambien y que inicializara los controladores que tengamos\
Para manejar de mejor manera estos controladores es mejor tenerlos en diferentes archivos y solo importarlos en el archivo server
```javascript
sockets() {
    this.io.on('connection', socket =>{
        console.log('Cliente conectado', socket.id);

        socket.on('disconnect', () =>{
            console.log('Cliente desconectado')
        })
    } );
}
```

## Configuracion inicial para implementar socket.io-client en el cliente

Se importa la libreria socket.io-client
```javascript

const { io } = require("socket.io-client");
```

Con este objeto io ahora podemos establecer los metodos que queramos escuchar y ejecutar para que el servidor lo reciba\
Los eventos con io son como listeners que estan a la escucha de cambios en el servidor
```javascript
socket.on('connect', () => {
    console.log('Conectado');
});
```

## Mandar informacion por parte del servidor

Para emitir informacion desde el servidor al cliente se utiliza el evento emit\
este metodo le enviara la informacion a todos los clientes que esten conectando y escuchando inlcuyendo el propio cliente que haya activado este evento\
como primer parametro se escpecifica el nombre del evento\
como segundo parametro se especifica la informacion a enviar\

```javascript
const payload = {
                    mensaje:'HOLA',
                    id: '123ABC',
                }
socket.broadcast.emit('enviar-mensaje', payload );
```

## Mandar informacion por parte del cliente
 
Para enviar informacion al servidor se utiliza el metodo emit\
Se especifica como primer parametro el nombre del evento que estara escuchando el servidor\
como segundo parametro la data que se enviara\
como tercer parametro algun callback que queramos que se ejecute y que se enviara tambien al servidor\
    
```javascript
const payload = {
                    mensaje:'HOLA',
                    id: '123ABC',
                }
socket.emit( 'enviar-mensaje', payload, ( id ) => {
    console.log('Desde el server', id );
});
```





