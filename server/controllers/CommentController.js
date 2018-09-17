'use strict'

const Comment = require('../models/comment');

class CommentController{

    // create comment
    static createComment(req,res){
        Comment.create({
            content : req.body.content,
            userIdComment : req.decoded.user_id,
            articleId : req.body.articleId
        })
        .then(comment =>{
            res.status(200).json({ msg : 'Comment has been created'})
        })
        .catch(error =>{
            res.status(500).json({ msg : 'Error: ',error})
        })
    }
}

module.exports = CommentController