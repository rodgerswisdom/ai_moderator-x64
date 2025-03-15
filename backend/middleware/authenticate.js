const jwt  = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    const token = req.header('auth-token');

    token = token.split(' ')[1];

    if(!token){
        return res.status(401).json({error: "Access Denied"});
    }
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(e){
        res.status(400).json({error: "Invalid Token"});
    }
}

module.exports = authenticate;