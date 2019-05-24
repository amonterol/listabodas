// Este archivo contiene los direccionamientos 
//de cada vista a su controlador o manejador


//Importamos modulos de terceros necesarios para la aplicacion
const express = require('express');

//Importamos archivos de la aplicacion necesarios para el manejo de las rutas
//a definir
const router = express.Router();
const authController = require('../controllers/usuarioCtr');



//Direccionamiento de proceso de inicio y finalizacion de sesion
router.get('/login', authController.getLogIn);
router.post('/login', authController.postLogIn);
router.post('/logout', authController.postLogout);

//Direccionamiento de proceso de autenticacion
router.get('/signup', authController.getSignUp);
router.post('/signup', authController.postSignUp);



//Direccionamiento de proceso de reset el password
router.get('/resetPwd', authController.getResetPwd);
router.post('/resetPwd', authController.postResetPwd);

//Direccionamiento del proceso de establecer el nuevo password
router.get('/nuevoPwd/:token', authController.getNuevoPwd);
router.post('/nuevoPwd', authController.postNuevoPwd);


module.exports = router;