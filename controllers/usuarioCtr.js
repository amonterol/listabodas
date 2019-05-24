//Importamos el modelo Lista para poder utilizar
//los metodos definidos  
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
//var nodemailer = require('nodemailer');
//var sgTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');




/*
var options = {
    auth: {
        api_key: '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'
    }
}

var mailer = nodemailer.createTransport(sgTransport(options));
*/


sgMail.setApiKey('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');


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
        errorMessage: message
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
                        /*

                        console.log( email );
                        return mailer.sendMail({
                            to: email,
                            from: 'abmontero@yahoo.com',
                            subject: 'Sing up succeded!',
                            html:'<h1> Your succesfully signed up!</h1>'
                        }).catch( err => console.log( err));

                        */
                        const msg = {
                            to: email,
                            from: 'listabodas@listabodas.com',
                            subject: 'Sending with Twilio SendGrid is Fun',
                            text: 'Sign Up succeded!',
                            html: '<strong>Sign Up succeded!</strong>',
                          };
                          console.log( email );
                          return sgMail.send(msg);
                        
                    })
                    .catch( err => console.log(err) );
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


exports.getResetPwd = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
   
    res.render('usuarios/resetPwd', {
        path: '/resetPwd',
        pageTitle: 'Reset Password',
        errorMessage: message
       
    });
};


exports.postResetPwd = (req, res, next) => {
    
    const email = req.body.email;
    console.log( email );
    
    //Primero definimos un nuevo token que sirve para verificar 
    //la autenticidad del usuario que va a cambiar al password
    //usando el paquete crypto
    crypto.randomBytes(32, (err, buffer) => {
      if ( err ) {
        console.log(err);
        return res.redirect('/reset');
      }
    const token = buffer.toString('hex');
      
    console.log( email );
    
     //Luego, establecemos el tiempo de expiracion del token en 1 hora
    const myDate = new Date();
    const newDate = new Date(myDate);
    newDate.setHours(newDate.getHours() + 1);
    console.log(myDate, newDate);
    const expiracionToken =  newDate;

    //Luego, debemos verificar si existe un usuario registrado
    //en la base datos con  email propocionado en el formulario
    Usuario.obtenerUsuarioPorEmail( email )
        .then(  rows  => {
            
            if ( rows[0].length ) {
                console.log(rows[0].length);
                console.log(rows[0]);
                return Usuario.actualizarTokenNuevoPassword(token, expiracionToken, email);
            } else{
                req.flash('error', 'No encontramos una cuenta con el email ingresado.');
                return res.redirect('/resetPwd');

            }
            
        })
        .then( () => {
            
            const msg = {
                to: email,
                from: 'listabodas@listabodas.com',
                subject: 'Cambio de clave',
                html:`
                <p> Para establecer una nueva clave haga click en el siguiente enlace:</p>
                <p><a href="http:/localhost:3000/nuevoPwd/${token}"</a></p>`
              };
              res.redirect('/');
              console.log( email );
              return sgMail.send(msg);
        })
        .catch( err => {
          console.log(err);
        });
    });
  };
  
  exports.getNuevoPwd = (req, res, next) => {
    const token = req.params.token;
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Usuario.obtenerUsuarioPorToken( token )
    .then(  rows  => {
            
        if ( rows[0].length  ) {
            console.log(rows[0].length);
            console.log(rows[0]);
            res.render('usuarios/nuevoPwd', {
                path: '/nuevoPwd',
                pageTitle: 'Nueva Clave',
                errorMessage: message,
                usuarioId: rows[0].idUsuario,
                pwdToken: token
               
            });
           
        } else {
            req.flash('error', 'No encontramos una cuenta con el email ingresado.');
            return res.redirect('/resetPwd');
        }

    })
    .catch( err => {
        console.log(err);
    });
  }

exports.postNuevoPwd = (req, res, next) => {
    const nuevoPwd = req.body.nuevaClave;
    const confirmaNuevoPwd = req.body.confirmaClave;
    const pwdToken = req.body.pwdToken;
    let email;

    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }


    if ( nuevoPwd != confirmaNuevoPwd) {
        req.flash('error', 'La nueva clave no coinciden');
        return res.render('usuarios/nuevoPwd', {
            path: '/nuevoPwd',
            pageTitle: 'Nueva Clave',
            errorMessage: message,
            pwdToken: pwdToken
           
        });
    } 
    Usuario.obtenerUsuarioPorToken( pwdToken)
        .then( rows => {

            if (rows[0].length) {
                console.log(rows[0].length);
                console.log('este es el usuario que obtenemos de la base de datos');
                console.log(rows[0]);

                console.log(rows[0][0].email);
                console.log(rows[0][0].idUsuario);
                email = rows[0][0].email;
                /*
                usuario = new Usuario (
                    rows[0][0].email, rows[0][0].idUsuario, rows[0][0].nombreUsuario, rows[0][0].primerApellidoUsuario,
                    rows[0][0].segundoApellidoUsuario, rows[0][0].telefonoUsuario, rows[0][0].direccionUsuario,
                    rows[0][0].passwordUsuario, rows[0][0].permisoUsuario, rows[0][0].token, rows[0][0].expiracionToken
                )
                */
                if ( nuevoPwd === confirmaNuevoPwd) {
                    return bcrypt.hash(nuevoPwd, 12) //bcryptjs es async, retorna una promesa hashedPassword
                } else {
                    req.flash('error', 'La nueva clave no coinciden');
                    return res.redirect('/nuevoPwd'); 
                }    
             } else {
                req.flash('error', 'No encontramos una cuenta con el email ingresado.');
                return res.redirect('/resetPwd');
            }

        })
        .then( hashedPassword => {
            
            const password = hashedPassword;
            const token = null;
            const expiracionToken = null;
            
            return Usuario.actualizarNuevoPassword( password, token, expiracionToken, email );
        })
        .then( result => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });

};