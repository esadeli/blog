'use strict'

const express = require('express');
const router = express.Router();
const IsLogin = require('../middlewares/IsLogin');
const UserController = require('../controllers/UserController');

// User registration
router.post('/register',(req,res)=>{
    UserController.registerUser(req,res);
})

// User login
router.post('/login',(req,res)=>{
    UserController.loginUser(req,res);
})

// List of users 
router.get('/lists',IsLogin,(req,res)=>{
    UserController.getAllUsers(req,res);
})

// Get individual User information
router.get('/details',IsLogin,(req,res)=>{
    UserController.getCredentials(req,res)
})

// Update user information
// Note: in reality it should be given IsLogin and IsAdmin
// but in case of testing in Postman the middlewares are revoked
// router.put('/edit/:id',IsLogin,(req,res)=>{
//     UserController.updateUserInformation(req,res);
// })

module.exports = router
