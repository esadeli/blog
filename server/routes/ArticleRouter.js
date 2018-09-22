'use strict'

const express = require('express');
const router = express.Router();
const IsLogin = require('../middlewares/IsLogin');
const ArticleController = require('../controllers/ArticleController');

// create Article
router.post('/',IsLogin,(req,res)=>{
    ArticleController.createArticle(req,res);
})

// get list of all article
router.get('/lists',(req,res)=>{
    ArticleController.getListOfArticles(req,res);
})

// get the details list of specific article
router.get('/details/:id',(req,res)=>{
    ArticleController.getOneArticle(req,res);
})

// edit articles
router.put('/edit/:id',IsLogin,(req,res)=>{
    ArticleController.editOneArticle(req,res);
})

// delete articles
router.delete('/delete/:id',IsLogin,(req,res)=>{
    ArticleController.deleteOneArticle(req,res);
})

// get articles by keyword
router.post('/search',(req,res)=>{
    ArticleController.getArticlesByKeyword(req,res);
})

module.exports = router