
//Importamos el modelo Lista para poder utilizar
//los metodos definidos  
const Producto = require('../models/producto');



//Exportamos la funcion que  permite que el administrador ver la pagina
//para agregar un producto.
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product'
    });
  }

//Exportamos la funcion que nos permite recoger la accion del formulario 
//utilizado para agregar un producto.
exports.postAddProduct = (req, res, next) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const precio = req.body.precio;
  //const cantidad = req.body.cantidad;
  const descripcion = req.body.descripcion;
  const imagen = req.body.imagenUrl;

  var nuevoProducto = new Producto(id, nombre, precio, descripcion, imagen);
  nuevoProducto
    .agregarProducto()
    .then(
      () => {
        res.redirect('/');
      })
    .catch(
      err => {
        console.log(err)
      });
};

  /*
//Exportamos la funcion que nos permite mostrar todos los productos 
//a los usuarios no administrador
exports.getProducts = (req, res, next) => {
  Producto.create({
    productoId: productoId,
    nombre: nombre,
    precio: precio,
    cantidad: cantidad,
    imagenUrl: imagenUrl,
    descripcion: descripcion
  })
  .then( result => {
    console.log( result );
  })
  .cath( err => {
    console.log( err );
  });
}  
*/

//Exportamos la funcion que nos permite mostrar todos los productos al administrador
exports.getListarProductos = (req, res, next) => {
 
  Producto
  .obtenerTodosLosProductos()
  .then(([rows, fieldsData]) => {
    res.render('admin/listarProductosAdmin', {
      productos: rows,
      pageTitle: 'Admin Lista de Productos',
      path: '/admin/listarProductosAdmin',
    });
  })
  .catch( err => console.log(err));
  
};
  

 