'use strict'

const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        unique : 'Email should be unique'
    },
    password : {
        type : String   
    },
    articlesList : [{
        type : Schema.Types.ObjectId,
        ref : 'Article'
    }]
},{
    timestamps : true
})

UserSchema.plugin(beautifyUnique);
const User = mongoose.model('User',UserSchema);

module.exports = User;
