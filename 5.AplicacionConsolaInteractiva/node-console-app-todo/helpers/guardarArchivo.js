const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = ( data ) => {
    /*9. Para guardar un arcihvo con la dependencia de fileSystem */
    fs.writeFileSync( archivo, JSON.stringify(data) );
}

const leerDB = () => {
    //10. Verificar que un archivo existe
    if( !fs.existsSync(archivo) ){
        return null;
    }
    
    //11. Leer un archivo
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse( info );

    // console.log(data);

    return data;
}



module.exports = {
    guardarDB,
    leerDB
}