const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { roles } = require('../config/access_control');

// API for registering USER
module.exports.register_user = async (req, res) => {
    try {
        // handeling if user already exist
        const user = await User.findOne({email : req.query.email});
        if(user) {
            return res.status(401).json({
                success: false,
                messaage: 'User already exist! Just go and sign-in!'
            })
        // if user not exists then creating user
        } else {
            const user = await User.create(req.body);
            return res.status(200).json({
               messaage: 'User signed-up successfuly!',
               data: user
            })
        }
    } catch (error) {
        return res.status(500).json({
            messaage: 'Internal Server Error!'
        })
    }
}

// API for sign-in user with JWT Authentication
module.exports.sign_in_user = async (req, res) => {
    try {
        let {email, password} = req.body;
        // handeling if user forgot to enter email and password
        if(!email || !password) {
            return res.status(401).json({
                success: false,
                messaage: 'Please enter valid Username/Password!'
            })
        }
        // searching USER in database
        const user = await User.findOne({email : email});
        // console.log("USER>>>>>", user)

        if(user) {
            if(user.password != password) {
                return res.status({
                    success: false,
                    messaage: 'Invalid Username/Password!'
                })
            } else {
                let token = jwt.sign(user.toJSON(), 'myKey', { expiresIn: '24h' });
                return res.status(200).json({
                    success: true,
                    data: token,
                    message: 'Singed-In Successfuly! please keep this token safe!'
                })
            }
        } else {
            return res.status(401).json({
                success: false,
                message: 'User not found !'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.messaage
        })
    }
}





//  ADMIN Sign-Up 
async function hashPassword(password) {
 return await bcrypt.hash(password, 10);
}
 
async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}
 
exports.signup = async (req, res, next) => {
 try {
  const {name, email, password, role } = req.body
const user = await User.findOne({email})
if(user) {
    return res.status(401).json({
        messaage: 'User Already Exists!'
    })
}
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ name,  email, password: hashedPassword, role: role || "basic" });
  await newUser.save();
  res.json({
   data: newUser,
  })
 } catch (error) {
  next(error)
 }
}

// Admin Sign-In
exports.login = async (req, res, next) => {
    try {
     const { email, password } = req.body;
     const user = await User.findOne({ email: email });
    //  console.log('USER>>>>>', user)
     if (!user) return next(new Error('Email does not exist'));
     const validPassword = await validatePassword(password, user.password);
     if (!validPassword) return next(new Error('Password is not correct'))
     const accessToken = jwt.sign(user.toJSON()  , 'myKey', {
        expiresIn: "24h"
       });
      return res.status(200).json({
      data: user,
      accessToken,
      message: 'User LoggedIn successfuly!'
     })
    } catch (error) {
    //  next(error);
     return res.status(500).json({
        messaage: error.messaage
     })
    }
   }

// for User Access Control
exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
   const permission = roles.can(req.user.role)[action](resource);
   if (!permission.granted) {
    return res.status(401).json({
     message: "You don't have enough permission to perform this action"
    });
   }
   next()
  } catch (error) {
   next(error)
  }
 }
}
 
exports.allowIfLoggedin = async (req, res, next) => {
 try {
  const user = res.locals.loggedInUser;
  if (!user)
   return res.status(401).json({
    message: "You need to be logged in to access this route"
   });
   req.user = user;
   next();
  } catch (error) {
   next(error);
  }
}