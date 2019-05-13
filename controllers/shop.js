const Producto = require('../models/producto');
//const Lista_Productos = require('../models/lista_productos');


//Exportamos la funcion que nos permite mostrar todos los productos 
exports.getIndex = (req, res, next) => {

  Producto
   .obtenerTodosLosProductos()
   .then(([rows, fieldsData]) => {
      res.render('shop/index', {
        productos: rows,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch( err => console.log(err));
    
};  


//Exportamos la funcion que nos permite mostrar todos los productos 
exports.getProductos = (req, res, next) => {
  
  Producto
  .obtenerTodosLosProductos()
  .then(([rows, fieldsData]) => {
    res.render('shop/productos', {
      productos: rows,
      pageTitle: 'Productos',
      path: '/productos',
    });
  })
  .catch( err => console.log(err));
  
};
  

//Exportamos la funcion que nos permite mostrar todos los productos 
exports.getProducto = (req, res, next) => {
  const id = req.params.idProducto;
  
  Producto
  .obtenerProductoPorId( id )
  .then( ([ producto ]) => {
        res.render('shop/detalleProducto', {
      producto: producto[0],
      pageTitle: producto.nombreProducto,
      path:'/productos'
    });
  })
  .catch( err => console.log(err) );
  
 
};




  //Exportamos la funcion que nos permite mostrar todos los productos 
exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders'
    });
}  

//Exportamos la funcion que nos permite mostrar todos los productos 
 exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart'
    });
}  

exports.postProductosEnLista = (req, res, next) => {
  const idLista = req.body.idLista;
  const idProducto = req.body.idProducto;
  
  Producto
  .obtenerTodosLosProductos()
  .then(([rows, fieldsData]) => {
    res.render('shop/productos', {
      productos: rows,
      pageTitle: 'Shop',
      idLista: idLista,
      path: '/productos',
    });
  })
  .catch( err => console.log(err));
  console.log(idLista);
  console.log(idProducto);
  //res.redirect('/cart');
  
}; 
/*
exports.postCart = (req, res, next) => {
  const idLista = req.body.idLista;
  const idProducto = req.body.idProducto;
  
  var nuevoProductoEnLista = new Lista_Productos( idProducto, idLista);
  
  nuevoProductoEnLista
  .agregarProductoALista()
  .then(
    () => {
      res.redirect('/');
    })
  .cath( err => {
    console.log(err)
  });
   
};  
*/
  //Exportamos la funcion que nos permite mostrar todos los productos 
  exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}  

