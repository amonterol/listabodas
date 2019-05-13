const path = require('path');

const express = require('express');

//Importamos el contralador de productos
const productosControlador = require('../controllers/productoControlador');
const shopControlador = require('../controllers/shop');
const lista_productosControlador = require('../controllers/lista_productosControlador');

const router = express.Router();





//Establecemos la ruta para la GET request de la pagina  "home page"
//que permite mostrar todas los productos en la base de datos.
//La solicitud de la pagina  ejecutara la funcion "getProducts" 
//del "productosControlador"
router.get( '/', shopControlador.getIndex );

//Establecemos la ruta para la GET request de la pagina  "home page"
//que permite mostrar todas los productos en la base de datos.
//La solicitud de la pagina  ejecutara la funcion "getProducts" 
//del "productosControlador"
router.get('/productos',  shopControlador.getProductos);

router.post('/productos', shopControlador.postProductosEnLista);

//router.get('/productos/delete',  );

router.get('/productos/:idProducto', shopControlador.getProducto );

router.get('/cart', shopControlador.getCart );

router.post('/cart', lista_productosControlador.postCart )

router.get('/orders', shopControlador.getOrders );

router.get('/checkout', shopControlador.getCheckout);



module.exports = router;