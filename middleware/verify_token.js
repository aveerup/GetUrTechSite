const jwt = require('jsonwebtoken');
const {SECRET} = require('../constants'); 

exports.verifyToken=(req, res, next) =>{
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ error: "You don't have access" });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}