const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routers');
const User = require('./models/user')

require('dotenv').config();

const port = process.env.port || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use('/', router);


app.use(async (req, res, next) => {
    if (req.headers.authorization) {
     const data = req.headers.authorization;
     const accessToken = data.split(' ')[1]; 
     const user = await jwt.verify(accessToken, 'myKey');
     res.locals.loggedInUser = await User.findOne({ email: user.email}); next(); 
    } else { 
     next(); 
    } 
   });

module.exports.startServer = async () => {
    try {
        await mongoose.connect(process.env.mongoDbURL);
        console.log('Databse Connected Successfuly with :: MongoDB')
        app.listen(port, (err) =>{
            if(err) {
                throw new Error(err);
            }
            console.log(`${process.env.environment} server starts at port :: ${port}`);
        })
    } catch (error) {
        console.log('error', error);
    }
}