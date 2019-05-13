
//Importamosla conexion a la base de datos
const db = require('../util/database')


module.exports = class Producto {
    
    constructor(id, nombre, precio, descripcion, imagenUrl) {
        this.idProducto = id;
        this.nombreProducto = nombre;
        this.precioProducto = precio;
        this.descripcionProducto = descripcion;
        this.imagenProducto = imagenUrl
    }

   
    //Mediante una consulta SQL agregamos una nueva lista a la base de datos
    //El resultado de la consulta devuelve una "promise" las cual utilizamos
    //en el listaControlador, de esta manera el manejador que actuarán 
    //asincrónicamente tanto en caso de éxito como en caso de una falla
    agregarProducto() {

        return db.promise().execute(
            'INSERT INTO `productos` ( `idProducto`, `nombreProducto`, `precioProducto`, `descripcionProducto`, `imagenProducto` ) VALUES( ?, ?, ?, ?, ? )',
            [this.idProducto,
            this.nombreProducto,
            this.precioProducto,
            this.descripcionProducto,
            this.imagenProducto], (error,
                results) => {
                if (error) {
                    return res.json({ error: error });
                } else {
                    return res.json({ results: results });
                }
            }
        )
    };

    //Mediante una consulta SQL leemos todas listas en la base de datos
    //El resultado de la consulta devuelve una "promise" las cual utilizamos
    //en el listaControlador, de esta manera el manejador que actuarán 
    //asincrónicamente tanto en caso de éxito como en caso de una falla
    static obtenerTodosLosProductos() {
        return db.promise().execute('SELECT * FROM `productos`');
    }
    
    static borrarUnProducto(){

    }
    //Mediante una consulta SQL leemos la lista con el numero de identificacion
    //contenido en el parametro "id". 
    //El resultado de la consulta devuelve una "promise" las cual utilizamos
    //en el listaControlador, de esta manera el manejador que actuarán 
    //asincrónicamente tanto en caso de éxito como en caso de una falla
    static obtenerProductoPorId( id ){
        return db.promise().execute('SELECT * FROM `productos` WHERE `idProducto` = ?',
        [id]);
    }

    agregarProductoALista(idProducto, idLista) {
        return db.promise().execute(
            'INSERT INTO `productos_has_listas` (`productos_idProductos`, `listas_idListas`) VALUES( ?, ? )',
            [ idProducto, idLista ], (error,
                results) => {
                if (error) {
                    return res.json({ error: error });
                } else {
                    return res.json({ results: results });
                }
            }
        )
    };
}

