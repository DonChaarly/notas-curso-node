require('colors');


const mostrarMenu = () => {

    /*3. Se tiene que envolver el readline en una promesa para hacer que Node espere a regresar el opt -> inquirer.js
    que el usuario ingresa mediante el resolve
    */
    return new Promise( resolve => {

        console.clear();
        console.log('=========================='.green);
        console.log('  Seleccione una opción'.green);
        console.log('==========================\n'.green);

        console.log(`${ '1.'.green } Crear tarea`);
        console.log(`${ '2.'.green } Listar tareas`);
        console.log(`${ '3.'.green } Listar tareas completadas`);
        console.log(`${ '4.'.green } Listar tareas pendientes`);
        console.log(`${ '5.'.green } Completar tarea(s)`);
        console.log(`${ '6.'.green } Borrar tarea`);
        console.log(`${ '0.'.green } Salir \n`);

        /*1. Para recibir informacion desde la consola se tiene que crear un objeto readline */
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        /*2. Despues se utiliza el metodo question para indicar al usuario que se tiene que escribir,\
             Como primer argumento se pasa un mensaje y como segundo un callback,
             Lo que el usuario ingrese se guardara dentro de opt */
        readline.question('Seleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        })

    });

    

}

const pausa = () => {

    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${ 'ENTER'.green } para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })
    });
}


module.exports = {
    mostrarMenu,
    pausa
}