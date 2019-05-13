
//Importamosla conexion a la base de datos
const db = require('../util/database')


module.exports = class Lista {
    
    constructor(id, nombre, fecha, lugar, estado, imagen) {
        this.idLista = id;
        this.nombreLista = nombre;
        this.fechaBoda = fecha;
        this.lugarCelebracion = lugar;
        this.estadoLista = estado;
        this.urlImagenLista = imagen;
    }

    
    //Mediante una consulta SQL agregamos una nueva lista a la base de datos
    //El resultado de la consulta devuelve una "promise" las cual utilizamos
    //en el listaControlador, de esta manera el manejador que actuarán 
    //asincrónicamente tanto en caso de éxito como en caso de una falla
    agregarLista() {

        return db.promise().execute(
            'INSERT INTO `listas` (`nombreLista`, `fechaBoda`, `lugarCelebracion`, `estadoLista`, `urlImagenLista`) VALUES( ?, ?, ?, ?, ? )',
            [   this.nombreLista,
                this.fechaBoda,
                this.lugarCelebracion,
                this.estadoLista,
                this.urlImagenLista
            ], (error,
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
    static obtenerTodasLasListas() {
        return db.promise().execute('SELECT * FROM `listas`');
    }
    
    static borrarLista(){

    }

    //Mediante una consulta SQL leemos la lista con el numero de identificacion
    //contenido en el parametro "id". 
    //El resultado de la consulta devuelve una "promise" las cual utilizamos
    //en el listaControlador, de esta manera el manejador que actuarán 
    //asincrónicamente tanto en caso de éxito como en caso de una falla
    static obtenerListaPorId( id ){
        return db.promise().execute('SELECT * FROM `listas` WHERE `idLista` = ?',
        [id]);
    }
    
    

}

