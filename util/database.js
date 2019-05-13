/*
En este archivo realizamos la conexion a la base de datos

*/

//Importamos los modulos de terceros necesarios para la aplicacion
//y lo asignamos al cliente mysql que manejara la conexion
const mysql = require('mysql2');
 
// Creamos una conexion a la base de datos tipo "pool" 
// Este tipo de conexiones nos permite manejar multiples conexion
//y evitar la latencia provocada por las multipless consultas
const pool =  mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'bdlistasbodas',
  password: '36uuy66',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
  
});

module.exports = pool;


/*
//Importamos los modulos de terceros necesarios para la aplicacion
const Sequelize = require('sequelize');

//Importamos las variables de ambiente desde el archivo variables.env
//utilizando el paquete npm "dotenv"
require('dotenv').config({path:'variables.env'});

//Definimos una instancia "sequelize" de la clase Sequelize para acceder a la 
//base de datos pasando cada parametro solicitado por la conexion
//usando la informacion del archivo variables.env

const sequelize = new Sequelize(
    process.env.DATABASE, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD,
    {   dialect: 'mysql', 
        host:'localhost'
    });


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = sequelize;
*/