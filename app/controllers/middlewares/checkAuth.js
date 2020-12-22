const jwt = require('jsonwebtoken');
const checkAuth = (req, res, next) =>{
    try {        
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'access_token');
        next();
      } catch (error) {
        res.status(404).send("auth faild");
      }
}
module.exports = checkAuth;