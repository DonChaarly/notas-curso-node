//5. Se hace la importacion de express y se crea una constante app
const express = require('express');
const app = express();

// 9. Para utilizar las renderizaciones de handlebars se debe importar 
const hbs = require('hbs');
require('./hbs/helpers');

const port = process.env.PORT || 3000;

/*8. Para servir contenido estatico se debe especificar que carpeta sera publica 
     esto se hace con el metodo **app.use(expres.static())**
*/
app.use(express.static(__dirname + '/public'));

//10. Tambien se tiene que establecer la carpeta en donde se encontraran los archivo
hbs.registerPartials(__dirname + '/views/parciales');
//11. Se indica que se utilizara handlebars
app.set('view engine', 'hbs');



//7. Para establecer una ruta y lo que regresera el servidor con la misma se utilza app.get()
app.get('/', (req, res) => {

    
    res.render('home', {
        nombre: 'fernando'
    });
});

app.get('/about', (req, res) => {
    //12. Para indicar que archivo se renderizara con handlebars se utilizara el metodo res.render()
    res.render('about');
});

/*6. Se establece abajo de todo el puerto en el que se estara escuchando con app.listen()
     Se acostumbra crear una constante para definir el puerto y mandar un callback al listen()
*/
app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${ port }`);
});