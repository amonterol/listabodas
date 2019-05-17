//Importamos el modelo Lista para poder utilizar
//los metodos definidos  
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

exports.getLogIn = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
   
    res.render('usuarios/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message
       
    });
};

exports.postLogIn = (req, res, next) => {
    //Primero recogemos la informacion del formulario
    const email = req.body.email;
    const password = req.body.password;
    console.log(`el email es -> ${email}`);
    console.log(`el password es -> ${password}`);
    //Luego debemos verificar si el usuario esta
    //registrado en la base datos 
    Usuario.obtenerUsuarioPorEmail (email )
        .then( ([rows, fieldsData]) => {
            if ( !(rows.length > 0) ) {
                req.flash('error', 'Invalid email or password.');
                console.log (rows);
               return res.redirect('/login');
            }
            //Si el email esta registrado en la BD debemo
            //desencriptar el password relacionado con el email
            //y compararlo con el ingresado por el usuario
            console.log('usuario si  esta en la BD');
            console.log('este es el password del usuario ->');
            console.log( rows[0].passwordUsuario);
            bcrypt
            .compare( password, rows[0].passwordUsuario )
            .then( coincidenciaPwd  => {
                if ( coincidenciaPwd ){
                    console.log('Hubo coincidencia de los password');
                    req.session.usuarioInicioSesion = true;
                    req.session.usuario = rows[0];
                    console.log(`el req.session.usuario -> ${req.session.usuario}`);
                    //tal vez haya que revisar esto
                    return req.session.save ( err => {
                        console.log( err );
                        res.redirect('/');
                    });
                    //hasta aqui
                }
                req.flash('error', 'Invalid email or password.');
                res.redirect('/login');
            })
            .catch( err => {
                console.log( err );
                res.redirect('/login');
            }); 

        /*
        req.session.save( () =>{
            console.log( err );
            res.redirect('/');
        })
        */
    })
    .catch(  err => console.log( err ));
    
};


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
    });
  };

exports.getSignUp = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('usuarios/signup', {
        path: '/signup',
        pageTitle: 'Sign Up',
        usuarioAutenticado: false
    });
};

//Maneja la accion del formulario de la pagina Sign Up o 
//Registrase para  agregar nuevos usuario.
exports.postSignUp = (req, res, next) => {
    //Recogemos la informacion del formulario
    const email = req.body.email;
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellido1 = req.body.primerApellido;
    const apellido2 = req.body.segundoApellido;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    const permiso = req.body.permiso;
    const password = req.body.password;
    const confirmarPassword = req.body.confirmar - password;

    //Aqui debemos validar los datos anteriores

    //Primero debemos verificar si existe un usuario 
    //registrado en la base datos con el mismo email
    Usuario.obtenerUsuarioPorEmail( email )
        .then( ([rows, fieldsData]) => {
            if (rows.length > 0) {
                req.flash('error', 'E-Mail exists already, please pick a different one.');
                console.log(rows[0]);
                console.log('Hasta aqui el usuario en la BD');
                return res.redirect('/signup');
            }
            //Como el usuario no esta en la BD hasheamos el password
            //y lo agregamos a la BD
            return bcrypt
                .hash(password, 12) //bcryptjs es async, retorna una promesa hashedPassword
                .then( hashedPassword => {
                    var nuevoUsuario = new Usuario(
                        email, id, nombre, apellido1,
                        apellido2, telefono, direccion,
                        hashedPassword, permiso
                    );
                    //Agregamos el nuevo usuario a la BD y lo redirigimos a 
                    //la pagina de log in
                    return nuevoUsuario.agregarUsuario();
                    })
                    .then( () => {
                        res.redirect('/login');
                    });
        })
        .catch( err => console.log(err) );

};


exports.getUsuario = (req, res, next) => {
    const id = req.params.idUsuario;
    Usuario
      .obtenerUsuarioPorId( id )
      .then( (usuario) => {
          res.render('usuario/signup', {
          usuario: usuario,
          pageTitle: lista.nombreUsuario,
          path:'/usuarios/signup'
        });
        //console.log(usuario);
        console.log(`el tamano de la lista de usuario es ${ usuario.length}`);
      })
      .catch( err => console.log(err) );
     
    };
