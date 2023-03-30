


const socketController = (socket) => {
    
    console.log('Cliente conectado', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    /*
        11. Para establecer eventos que escuchen algo que mande el cliente se utiliza nuevamente el objeto socket
            En este caso el evento recibira como pimer parametro informacion de parte del cliente y un callback que podremos 
            ejecutar en nuestro controlador y se ejecutara tambien en el cliente
    */
    socket.on('enviar-mensaje', ( payload, callback ) => {
        
        const id = 123456789;
        callback( id );
        /*
            12. Para emitir informacion desde el servidor al cliente se utiliza el evento emit
                este metodo le enviara la informacion a todos los clientes que esten conectando y escuchando inlcuyendo el propio cliente que haya activado este evento
                como primer parametro se escpecifica el nombre del evento 
                como segundo parametro se especifica la informacion a enviar
        */
        socket.broadcast.emit('enviar-mensaje', payload );

    })

}



module.exports = {
    socketController
}

