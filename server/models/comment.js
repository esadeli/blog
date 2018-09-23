'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content : {
        type : String
    },
    userIdComment : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    userfullname:{
        type: String
    },
    articleId : {
        type : Schema.Types.ObjectId,
        ref : 'Article'
    },
},{
    timestamps : true
})

const Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;