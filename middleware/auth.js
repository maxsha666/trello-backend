const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Obtener el token de la cabecera (header)
  const token = req.header('x-auth-token');

  // 2. Si no hay token, bloquear el acceso
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso no válido' });
  }

  // 3. Si hay token, verificarlo
  try {
    // jwt.verify descifra el token usando nuestro secreto
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos el payload del token (que contiene el id del usuario) en el objeto de la petición
    req.user = decoded.user;
    next(); // El token es válido, dejamos pasar la petición
  } catch (err) {
    // Si el token no es válido (ej. está expirado o fue alterado)
    res.status(401).json({ msg: 'Token no es válido' });
  }
};