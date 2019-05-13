
//Importamos el modelo Lista para poder utilizar
//los metodos definidos  
const Lista = require('../models/lista');

//Exportamos la funcion que nos permite desplegar la pagina
//para agregar una nueva lista al administrador
exports.getAddLista = (req, res, next) => {
    res.render('admin/add-lista', {
    pageTitle: 'Agregar Lista',
    path: '/admin/add-lista',
  });
}

//Exportamos la funcion que nos permite recoger la accion del formulario 
//utilizado para agregar una lista por parte del administrador
exports.postAddLista = (req, res, next) => {
  const id = null;
  const nombre = req.body.nombre;
  const fecha = req.body.fecha;
  const lugar = req.body.lugar;
  const estado = req.body.estado;
  const imagen = req.body.imagen;  
   
  var nuevaLista = new Lista(id, nombre,fecha, lugar,estado, imagen);
  nuevaLista
    .agregarLista()
    .then(
      () => {
        res.redirect('/listas/listas');
      })
    .catch(
      err => {
        console.log(err)
      });
  };

//Exportamos la funcion que nos permite mostrar todas las listas
//al usuario no administrador
exports.getListas = (req, res, next) => {
  Lista
   .obtenerTodasLasListas()
   .then(([rows, fieldsData]) => {
      res.render('listas/listas', {
        listas: rows,
        pageTitle: 'Listas de Bodas',
        path: 'listas/listas',
      });
    })
    .catch( err => console.log(err));
  };



//Exportamos la funcion que nos permite mostrar todas las listas
//al administrador de la aplicacion
exports.getMostrarListas = (req, res, next) => {
  Lista
   .obtenerTodasLasListas()
   .then(([rows, fieldsData]) => {
      res.render('admin/mostrarListas', {
        listas: rows,
        pageTitle: 'Listas de Bodas',
        path: 'admin/mostrarListas',
      });
    })
    .catch( err => console.log(err));
  
  };

  //Exportamos la funcion que nos permite mostrar todos los productos 
  /*
  exports.getLista = (req, res, next) => {
    const id = req.params.idLista;
    
    Lista
    .obtenerListaPorId( id )
    .then( ([ lista ]) => {
        res.render('listas/detalleLista', {
        lista: lista[0],
        pageTitle: lista.nombreLista,
        path:'/listas/listas'
      });
    })
    .catch( err => console.log(err) );
   
  };
  */
  exports.getLista = (req, res, next) => {
  const id = req.params.idLista;
  Lista
    .obtenerListaPorId( id )
    .then( ([ lista ]) => {
        res.render('listas/detalleLista', {
        lista: lista,
        pageTitle: lista.nombreLista,
        path:'/listas/listas'
      });
      console.log(lista);
      console.log(`el tamano de la lista es ${ lista.length}`);
    })
    .catch( err => console.log(err) );
   
  };
 
 


exports.getListaAdmin = (req, res, next) => {
  const id = req.params.idLista;
  
  Lista
  .obtenerListaPorId( id )
  .then( ([ lista ]) => {
      res.render('admin/detalleListaAdmin', {
      lista: lista[0],
      pageTitle: lista.nombreLista,
      path:'/mostrarListas'
    });
  })
  .catch( err => console.log(err) );



};

exports.mostrarProductosDeUnaLista = (req, res, next) => {
  const id = req.params.idLista;
  /*
  Lista
  .obtenerListaPorId( id )
  .then( ([ lista ]) => {
      lista: lista[0];
  })
  .catch( err => console.log(err) );
  */
  Lista
  .mostrarProductosDeUnaLista( id )
  .then( ([ productos ]) => {
      res.render('listas/detalleLista', {
      productos: productos,
      pageTitle: lista.nombreLista,
      path:'/listas/listas'
    });
  })
  .catch( err => console.log(err) );
};




  
