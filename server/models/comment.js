'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    description : {
        type : String
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
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