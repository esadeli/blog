'use strict'

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

function IsLogin(req,res,next) {
    
    // console.log('TOKEN MIDDLEWARE--->',req.headers.token)
    // check if token exists
    if(req.headers.token){

        // verify token
        jwt.verify(req.headers.token,process.env.SECRETTOKEN,(error,decoded)=>{
            if(error){
                res.status(403).json({ msg : 'Invalid jwt token' });
            }else{
                let idCheck = ObjectId(decoded.user_id)
                User.findOne({ _id : idCheck,email : decoded.email })
                    .then(user =>{

                        if(user){
                            req.id = user._id,
                            req.name = user.name,
                            req.email = user.email,
                            req.decoded = decoded;
                            next();

                        }else if(row ===null){
                            res.status(403).json({ msg : 'You are not authorized' });
                        }
                    })
                    .catch(err =>{
                        res.status(500).json({ msg : err });
                    })
            }
        })
    }else{
        res.status(403).json({ msg : 'You are not authorized' });
    }
}

module.exports = IsLogin
