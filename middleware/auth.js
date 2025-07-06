const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    // --- ESTE BLOQUE NOS DIRÁ LA VERDAD ---
    console.log('------------------------------------');
    console.log('--- ERROR DE VERIFICACIÓN DE TOKEN ---');
    console.log('Token Recibido:', token);
    console.log('Secreto Usado:', process.env.JWT_SECRET);
    console.log('Error Específico de JWT:', err.name, '-', err.message);
    console.log('------------------------------------');
    
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;