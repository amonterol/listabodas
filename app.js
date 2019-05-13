//Importamos los modulos npm de terceros necesarios para la aplicacion
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const errorController = require('./controllers/error');


//Importamos las variables de ambiente desde el archivo variables.env
//utilizando el paquete npm "dotenv"
//require('dotenv').config({path:'variables.env'});


//Importamos la conexion a la base de datos para que pueda ser
//usada por la aplicacion
//const sequelize = require('./util/database');
//const db = require('./util/database');



//app es una instancia de express la cual nos permite hacer la conexion 
//al servidor, es decir crear una nueva sesion
const app = express();

//Registramos el motor de plantillas escogido, en este caso EJS
//Al mismo tiempo se define el directorio donde estaran las vistas de la app.
app.set('view engine', 'ejs');
app.set('views', 'views');




//Importamos el archivo admin.js donde se encuentra las rutas
//de las diferentes vistas
const adminRoutes = require('./routes/admin.js');
const listasRoutes = require('./routes/lista.js');
const shopRoutes = require('./routes/shop.js');



/*
Analiza las partes de  un "request" entrantes en un middleware y nos permite
utilizarlos en algun manejador disponibles bajo la propiedad "req.body". 
Todas las propiedades y valores del objeto "req.body" debe ser validadas.
*/
app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());

//Hacemos accesibles los archivos que contiene las rutas
//todas las rutas de admin.js puede escribirse sin "/admin"
app.use('/admin', adminRoutes);
app.use('/listas', listasRoutes); 
app.use(shopRoutes); 

/*
Para utilizar los archivos estáticos como imágenes, archivos CSS y archivos JavaScript, 
usamos la función de middleware incorporada express.static de Express.
Por lo cual es necesario almacenarlos en el directorio "public"
*/
//app.use('/static', express.static(path.join(__dirname, 'public')));
//app.use('/css', express.static(path.join(__dirname , 'public/css')));
//app.use('/images', express.static(path.join(__dirname , 'public/images')));

app.use(express.static(path.join(__dirname, 'public')));

//Definimos el middleware para del error 404 recurso no encontrado
app.use(errorController.getError404);

/*
//Creamos las tablas en la base de datos. La base de datos
//debe existir previo a la creacion, ver archivo database.js
sequelize
    .sync( )
    .then( result => {
        //console.log(result);
        //Iniciamos el servidor segun el numero definido en el archivo variables.env
        //app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
        app.listen(3000);
    })
    .catch( err =>{
        console.log(err);
    });

//Iniciamos el servidor segun el numero definido en el archivo variables.env
//app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));

 */ 
//Iniciamos el servidor segun el numero definido en el archivo variables.env
        //app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
        app.listen(3000);

