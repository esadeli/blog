'use strict'

const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const IsLogin = require('../middlewares/IsLogin');

// add individual comment
router.post('/',IsLogin,(req,res)=>{
    CommentController.createComment(req,res);
})

// get list of all comment



module.exports = router