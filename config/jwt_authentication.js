const User = require("../models/user")
const jwt = require('jsonwebtoken');

// method for setting up authentication of doctors
module.exports.checkAuthentication =  (req, res, next) => {

    const data = req.headers.authorization;        // receives data from header
    const token= data.split(' ')[1];               // spliting token
    const user = jwt.verify(token , 'myKey');      // decoding token and varifying
     
    if(!user) {

        return res.status(401).json({ 
            success:false,
            message: 'Token expired ! please regenerate it !'
        });

    } else {
        next();
    }     
};