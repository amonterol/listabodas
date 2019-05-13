/*
En este archivo utilizamos la clase  "express.Router "para crear 
los diferentes manejadores de rutas en forma modular.
*/

//Importamos los modulos de terceros necesarios para la aplicacion
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Producto = require('../models/producto');


//Importamos el contralador de productos
const productoControlador = require('../controllers/productoControlador');
const listaControlador = require('../controllers/listaControlador');


//Creamos una instancia de clase express.Router para direccionamiento 
//de todas las vistas de la aplicacion
const router = express.Router();


//Establecemos la ruta para la GET request de la pagina  "add-product"
//que contiene los campos requeridos para  agregar un producto.
//La solicitud de la pagina  ejecutara la funcion "getAddProduct" 
//del "productosControlador"
router.get( '/add-product', productoControlador.getAddProduct );

//Establecemos la ruta para la POST request de la pagina  "add-product"
//que posibilita recoger la accion del formulario que contiene la pagina
//La solicitud de la pagina  ejecutara la funcion "postAddProduct" 
//del "productosControlador" que permite agregar un nuevo producto
router.post( '/add-product', productoControlador.postAddProduct );



//Establecemos la ruta para la GET request de la pagina  "add-lista"
//que contiene los campos requeridos para agregar un producto.
//La solicitud de la pagina  ejecutara la funcion "getAddLista" 
//del "listaControlador"
router.get( '/add-lista', listaControlador.getAddLista );


//Establecemos la ruta para la POST request de la pagina  "add-lista"
//que posibilita recoger la accion del formulario que contiene la pagina
//La solicitud de la pagina  ejecutara la funcion "postAddLista" 
//del "listaControlador" que permite agregar una nueva lista
router.post( '/add-lista', listaControlador.postAddLista );


//Establecemos la ruta para la GET request de la pagina  "admin/listarProductos"
//que permite mostrar todas los productos en la base de datos al administrador.
//La solicitud de la pagina  ejecutara la funcion "getProducts" 
//del "productosControlador"
router.get( '/listarProductos', productoControlador.getListarProductos );

//Establecemos la ruta para la GET request de la pagina  "/productos"
//que permite mostrar todas los productos en la base de datos.
//La solicitud de la pagina  ejecutara la funcion "getProducts" 
//del "productosControlador"
//   /productos => GET
//router.get('/productos', productoControlador.getProducts );



//Establecemos la ruta para la GET request de la pagina  "admin/mostrarListas"
//que permite mostrar todas las listas en la base de datos al administrador.
//La solicitud de la pagina  ejecutara la funcion "getMostrarLista" 
//del "listasControlador"
router.get( '/mostrarListas', listaControlador.getMostrarListas  );


//Establecemos la ruta para la GET request de la pagina  "admin/detalleLista"
//que permite mostrar el detalle de una lista en la base de datos al administrador.
//La solicitud de la pagina  ejecutara la funcion "getLista" 
//del "listasControlador"
router.get('/mostrarListas/:idLista', listaControlador.getListaAdmin );


module.exports = router;


 
 
