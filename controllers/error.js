exports.getError404 = (req, res, next) => {
    res.status(404).render( '404', { 
        pageTitle: 'Pagina No Encontrada',
        path:'/404'
     });
};