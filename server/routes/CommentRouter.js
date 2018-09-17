'use strict'

const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const IsLogin = require('../middlewares/IsLogin');

// add individual comment
router.post('/',IsLogin,(req,res)=>{
    CommentController.createComment(req,res);
})

// get list of all comment of one article
router.get('/lists',(req,res)=>{
    CommentController.getListOfComments(req,res);
})

// delete individual comment
router.delete('/delete/:id',IsLogin,(req,res)=>{
    CommentController.deleteOneComment(req,res);
})


module.exports = router