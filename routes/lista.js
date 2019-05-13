/*
En este archivo utilizamos la clase  "express.Router "para crear 
los diferentes manejadores de rutas en forma modular.
*/

//Importamos los modulos de terceros necesarios para la aplicacion
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const listaControlador = require('../controllers/listaControlador');

//Creamos una instancia de clase express.Router para direccionamiento 
//de todas las vistas de la aplicacion
const router = express.Router();



//Establecemos la ruta para la GET request de la pagina  "listas"
//que permite mostrar todas las listas en la base de datos.
//La solicitud de la pagina  ejecutara la funcion "getListas" 
//del "listasControlador"
router.get( '/listas', listaControlador.getListas );


router.get('/listas/:idLista', listaControlador.getLista );



module.exports = router;
