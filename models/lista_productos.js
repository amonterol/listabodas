//Importamosla conexion a la base de datos
const db = require('../util/database')


module.exports = class Lista_Productos {
    
    constructor(idProducto, idLista) {
        this.idProducto = idProducto;
        this.idLista = idLista;
    }

   
    //Mediante una consulta SQL agregamos una nueva lista a la base de datos
    //El resultado de la consulta devuelve una "promise" las cual utilizamos
    //en el listaControlador, de esta manera el manejador que actuarán 
    //asincrónicamente tanto en caso de éxito como en caso de una falla
 agregarProductoALista() {
        return db.promise().execute(
            'INSERT INTO `productos_has_listas` (`productos_idProductos`, `listas_idLista`) VALUES( ?, ? )',
            [ this.idProducto, this.idLista ], (error,
                results) => {
                if (error) {
                    return reject(error);
                }
                if (results) {
                    resolve(rows);
                }
            }
        )
        
    }
   

    
       
}

