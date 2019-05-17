/* En este archivo creamos un middleware que sera
siempre ejecutado con el proposito de proteger las
rutas o los direccionamientos de las paginas, para
que solo puedan ser accesadas cuando el usuario
haya inciado sesion.
Este middleware es anexado a cada route.
*/

module.exports = (req, res, next) => {
    if( !req.session.usuarioInicioSesion ) {
        return res.redirect('/login')
    }
    next();
}