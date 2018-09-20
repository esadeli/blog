'use strict'

const Comment = require('../models/comment');
const Article = require('../models/article');

class CommentController{

    // create comment
    static createComment(req,res){
        Comment.create({
            content : req.body.content,
            userIdComment : req.decoded.user_id,
            articleId : req.body.articleId
        })
        .then(comment =>{
            let newComment = comment;
            // console.log('Comment -->',newComment)
            //Update article
            Article.findOne({ _id: req.body.articleId })
                .then(article =>{
                    // console.log('Article -->',article)
                    article.update({
                        $push : { commentsList : newComment}
                    })
                    .then( row =>{            
                        res.status(200).json({ 
                            msg : 'Comment has been created',
                            data : newComment
                        })
                    })
                    .catch( error =>{
                        res.status(500).json({ msg : 'ERROR: ',error})
                    })
                })
                .catch(error =>{
                    res.status(500).json({ msg : 'ERROR: ',error})
                })
        })
        .catch(error =>{
            res.status(500).json({ msg : 'Error: ',error})
        })
    }

    // get list of comments of one article
    static getListOfComments(req,res){
        Comment.find({articleId : req.body.articleId})
            .then(articles=>{
                res.status(200).json({
                    msg : `list of comments with article id ${req.body.articleId}`,
                    data : articles
                })
            })
            .catch(error=>{
                res.status(500).json({ msg : 'Error: ',error});
            })
    }

    // delete one comment
    static deleteOneComment(req,res){
        Comment.findOne({_id : req.params.id})
            .then(commentFound =>{
                // check user authorization
                if(commentFound.userIdComment == req.decoded.user_id){
                    
                    // delete comment
                    Comment.findOneAndRemove({ _id: req.params.user_id})
                        .then( comment =>{
                            res.status(200).json({ 
                                msg : 'Comment has been deleted',
                                data : comment
                                
                            })
                        })
                        .catch(error =>{
                            res.status(500).json({ msg : 'Error', error})
                        })

                }else{
                    res.status(500).json({ msg : 'You are not authorized to delete this comment'})
                }
            })
            .catch(error =>{
                res.status(500).json({ msg : 'Error: ',error});
            })
    }
}

module.exports = CommentController