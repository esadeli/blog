'use strict'

const User = require('../models/user');
// const jwt = require('jsonwebtoken');
const Article = require('../models/article');
const Comment = require('../models/comment');

class ArticleController {
    static createArticle(req,res){

        Article.create({
            title : req.body.title,
            description : req.body.description,
            userId : req.decoded.user_id,
            commentsList : []
        })
        .then(article=>{
            let newArticle = article
            // console.log('Article -->',newArticle)

            //update user
            User.findOne({_id : req.decoded.user_id})
                .then(user =>{
                    // console.log('User-->',user)
                    user.update({
                        $push : {
                            articlesList : newArticle
                        }
                    })
                    .then(row=>{
                        // console.log('ROW--->',row)
                        res.status(200).json({ 
                            msg : `Article with name ${article.title} has been created`,
                            data : newArticle
                        })
                    })
                    .catch(error =>{
                        res.status(500).json({ msg : 'ERROR: ',error})
                    })
                })
                .catch(error =>{
                    res.status(500).json({ msg: 'ERROR: ',error})
                })
        })
        .catch(error =>{
            res.status(500).json({ msg : 'ERROR: ',error })
        })
    }

    // get list of articles
    static getListOfArticles(req,res){

        Article.find({}).populate('commentsList')
            .then(articles=>{
                res.status(200).json({
                    msg : 'List of articles',
                    data : articles
                })
            })
            .catch(error =>{
                res.status(500).json({ msg : error })
            })
    }

    // get one article
    static getOneArticle(req,res){
        Article.findOne({_id : req.params.id}).populate('commentsList')
            .then(article =>{
                res.status(200).json({ 
                    msg : 'Detail of article',
                    data : article
                })
            })
            .catch(error =>{
                res.status(500).json({ msg : 'Error: ',error})
            })
    }

    // edit one article
    static editOneArticle(req,res){
        // console.log('PARAM----->',req.params.id)
        Article.findOne({_id : req.params.id})
            .then(articleFound=>{
                let initialComments = articleFound.commentsList
                // article found
                if(articleFound){
                    // verify token and userId in article
                    if(articleFound.userId==req.decoded.user_id){

                        // let update this article
                        Article.findOneAndUpdate({ _id: req.params.id },{
                            title : req.body.title,
                            description : req.body.description,
                            userId : req.decoded.user_id, 
                            commentsList : initialComments
                        })
                        .then(article =>{
                            // console.log('Article-->',article)
                            res.status(200).json({
                                msg : `Article has with title ${article.title} been edited`,
                                data : article
                            })
                        })
                        .catch(error =>{
                            res.status(500).json({ msg : 'Error: ',error});
                        })

                    }else{
                        res.status(401).json({ msg : 'You are not authorized to edit this article'})
                    }

                }else{
                    //this article is not found
                    res.status(500).json({ msg : 'Article is not found'})
                }
            })
            .catch(error =>{
                res.status(500).json({ msg : 'Error: ',error})
            })
    }

    // Delete one article
    static deleteOneArticle(req,res){
        Article.findOne({ _id : req.params.id })
            .then(articleFound=>{
                if(articleFound){
                    //verify the user
                    if(articleFound.userId == req.decoded.user_id){
                        // delete all the existing comment in comment table first
                        Comment.deleteMany({ articleId : req.params.id})
                            .then(comments=>{
                                // successful delete of all comments if any

                                // final step delete the article
                                Article.findOneAndRemove({_id : req.params.id})
                                    .then(article =>{
                                        res.status(200).json({ 
                                            msg : `Article with title ${article.title} has been deleted`,
                                            data : article
                                        })
                                    })
                                    .catch(error =>{
                                        res.status(500).json({ msg : 'Error ',error})
                                    })
                            })
                            .catch(error =>{
                                res.status(500).json({ msg : 'Error: ',error})
                            })
                    }else{
                        res.status(401).json({ msg : 'You are not authorized to delete this article'});
                    }
                }else{
                    res.status(500).json({ msg : 'Article is not found'})
                }
            })
            .catch(error=>{
                res.status(500).json({ msg : 'Error: ',error})
            })
    }

    // get articles by keyword
    static getArticlesByKeyword(req,res){
        // get regex
        let regex = new RegExp(`${req.body.keyword}`,'i');
        Article.find({}).populate('commentsList')
            .then(articles =>{
                let arraySort = [];
                articles.forEach( article =>{
                    if(regex.test(article.title)) {
                       arraySort.push(article)
                    }    
                })
                res.status(200).json({
                    msg: 'List of sorted data',
                    data: arraySort
                })
            })
            .catch(error =>{
                res.send(500).json({ msg: 'ERROR: ',error});
            })
    }
}

module.exports = ArticleController