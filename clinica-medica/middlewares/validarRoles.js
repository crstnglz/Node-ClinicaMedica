const esAdmin = (req, res, next) => {
    if(req.usuarioRol !== 'admin')
    {
        return res.status(403).json({ msg: 'Acceso denegado. Se requiere rol admin.' });
    }
    next();
};

const esMedico = (req, res, next) => {
    if(req.usuarioRol !== 'medico')
    {
        return res.status(403).json({ msg: 'Acceso denegado. Se require rol medico.' });
    }
    next();
}

const esRecepcionista = (req, res, next) => {
    if(req.usuarioRol !== 'recepcionista')
    {
        return res.status(403).json({ msg: 'Acceso denegado. Se requiere rol recepcionista' });
    }
    next();
}

const esMedicoOAdmin = (req, res, next) => {
    if(req.usuarioRol !== 'medico' && req.usuarioRol !== 'admin')
    {
        return res.status(403).json({ msg: 'Acceso denegado.' });
    }
    next();
}

export { esAdmin, esMedico, esRecepcionista, esMedicoOAdmin}