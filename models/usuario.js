//Importamosla conexion a la base de datos
const db = require('../util/database')


module.exports = class Usuario {

    constructor(email, id, nombre, apellido1, apellido2, telefono, direccion, clave, permiso) {

        this.email = email;
        this.idUsuario = id;
        this.nombreUsuario = nombre;
        this.primerApellidoUsuario = apellido1;
        this.segundoApellidoUsuario = apellido2;
        this.telefonoUsuario = telefono;
        this.direccionUsuario = direccion;
        this.passwordUsuario = clave;
        this.permisoUsuario = permiso;

    }

    agregarUsuario() {
        
        return db.promise().execute(
            `INSERT INTO usuarios (  
            email,
            idUsuario, 
            nombreUsuario, 
            primerApellidoUsuario,
            segundoApellidoUsuario,
            telefonoUsuario,
            direccionUsuario,
            passwordUsuario,
            permisoUsuario ) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ? )`,

            [this.email,
            this.idUsuario,
            this.nombreUsuario,
            this.primerApellidoUsuario,
            this.segundoApellidoUsuario,
            this.telefonoUsuario,
            this.direccionUsuario,
            this.passwordUsuario,
            this.permisoUsuario], (error,
                results) => {
                if (error) {
                    return res.json({ error: error });
                } else {
                    return res.json({ results: results });
                }
            }
        )
    };

    static obtenerUsuarioPorEmail( email ){
        return db.promise().execute('SELECT * FROM `usuarios` WHERE `email` = ?',
        [email]);
    };

    
}