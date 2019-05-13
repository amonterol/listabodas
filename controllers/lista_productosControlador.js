const Lista_Productos = require('../models/lista_productos');


exports.postCart = (req, res, next) => {
    const idLista = req.body.idLista;
    const idProducto = req.body.idProducto;
    
    var nuevoProductoEnLista = new Lista_Productos(idProducto, idLista);
    /*
    nuevoProductoEnLista
    .agregarProductoALista()
    .then(([rows, fieldsData]) => {
        res.render('shop/productos', {
          productos: rows,
          pageTitle: 'Shop',
          path: '/productos',
        });
      })
    .catch( err => console.log(err));
    */
   nuevoProductoEnLista
    .agregarProductoALista()
    .then(
        () => {
          res.redirect(`admin/mostrarListas/${idLista}`);
        })
    .catch( err => console.log(err));
    console.log('La id de la lista es');
    console.log(idLista);
    console.log('La id del producto es');
    console.log(idProducto);
  };  
  