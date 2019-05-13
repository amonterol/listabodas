/*
En este archivo construimos una forma de acceder a la ubicacion
del directorio donde reside la aplicacion 
*/

const path = require('path');

//dirname retorna el nombre del directorio de la ruta indicada 
//process.mainModule.filename-> ruta al directorio raiz de la aplicacion
module.exports = path.dirname(process.mainModule.filename);