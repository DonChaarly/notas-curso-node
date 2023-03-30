
// Referencias del HTML
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');

//6. para implementar los eventos socket es necesario primero importar la libreria de socket.io
const socket = io();


//7. Los eventos con io son como listeners que estan a la escucha de cambios en el servidor
//8. En este caso se tiene un listener que se ejecuta cuando se conecta con el servidor
socket.on('connect', () => {
    // console.log('Conectado');

    lblOffline.style.display = 'none';
    lblOnline.style.display  = '';

});

//9. Se tiene el evento de desconexion tambien
socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    lblOnline.style.display  = 'none';
    lblOffline.style.display = '';
});


socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})


btnEnviar.addEventListener( 'click', () => {

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    
    /*
        10. Para enviar informacion al servidor se utiliza el metodo emit -> sockets/controller.js
            Se especifica como primer parametro el nombre del evento que estara escuchando el servidor
            como segundo parametro la data que se enviara
            como tercer parametro algun callback que queramos que se ejecute y que se enviara tambien al servidor
    */
    socket.emit( 'enviar-mensaje', payload, ( id ) => {
        console.log('Desde el server', id );
    });

});