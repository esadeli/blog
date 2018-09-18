'use strict'
process.env.NODE_ENV = "test"

const assert = require('assert');
const chai = require('chai')
const chaiHttp = require('chai-http');
const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');
chai.use(chaiHttp)
const expect = chai.expect
const app = require('../app');
const jwt = require('jsonwebtoken');


// testing get articles
describe('Comment',()=>{
    let getToken = '';
    let getArticleId = '';
    let getCommentId = '';

    // data awal
    let nameAwal = 'Indro';
    let emailAwal = 'indro@indro.com'; 
    let passwordAwal = 'indro';
    
    beforeEach((done) => {
        User.create({
            name : nameAwal,
            email : emailAwal,
            password : passwordAwal
        })
        .then(user =>{
            
            jwt.sign({
                user_id : user._id,
                name : user.name,
                email : user.email
            },process.env.SECRETTOKEN,(err,token)=>{
                if(token){
                    getToken = token;
                    
                    // create article
                    Article.create({
                        title : 'Ini judul article with comment',
                        description : 'Penjabaran isi article with comment',
                        userId : user._id    
                    })
                    .then(article =>{
                        getArticleId = article._id
                        // create comment here

                        Comment.create({
                            content : 'Ini comment baru',
                            userIdComment : user._id,
                            articleId : article._id
                        })
                        .then(comment =>{
                            getCommentId = comment._id;
                            done();
                        })
                        .catch(error =>{
                            console.log('ERROR: ',error)
                            done();
                        })

                    })
                    .catch(error => {
                        console.log(error);
                        done();
                    })
                }else{
                    console.log('ERROR : ',err);
                    done();
                }
            })
        })
        .catch(error =>{
            console.log(error)
        })        
    });

    
    // create new articles
    it('should create a new article',function(done){
        // console.log('ID Before create--->',getId)
        chai.request(app)
        .post('/articles')
        .set('token',getToken)
        .send({
            title : 'Sebuah artikel kekinian',
            description : 'Perkembangan jaman pada saat ini menandakan sesuatu yang luar biasa....'
        })
        .end((err,res)=>{
            // console.log(res.body.data._id)
            getArticleId = res.body.data._id;
            // console.log('ERROR-->',res.body)
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.a.property('msg');
            expect(res.body.data).to.have.a.property('title');
            done();
        })
    })

    //create comments
    it('should create comments',function(done){
        // console.log('ID BEFORE EDIT---->',getId)
        
        chai.request(app)
        .post(`/comments/`)
        .set('token',getToken)
        .send({
            content : 'Ini new content',
            articleId : getArticleId
        })
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.data).to.be.a('object');
            expect(res.body.data).to.have.a.property('content');
            done();
        })
    })

    // show all comments
    it('should show all comments',function(done){
        
        chai.request(app)
        .get('/comments/lists')
        .send({
            articleId : getArticleId
        })
        .end((err,res)=>{
            // console.log('Hasil Create comments-->',res.body)
            expect(res).to.have.status(200);
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.have.a.property('content');
            done();
        })
    })

    // delete comment
    it('should delete comments',function(done){
        
        chai.request(app)
        .delete(`/comments/delete/${getCommentId}`)
        .set('token',getToken)
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.a.property('data');
            expect(res.body.data).to.be.a('null');
            done();
        })
    })

    afterEach((done)=>{
        Comment.remove({})
            .then(comment =>{
                Article.remove({})
                    .then(article =>{
                        User.findOneAndRemove({
                            email : 'indro@indro.com'
                        })
                        .then( user =>{
                            done()
                        })
                        .catch(error =>{
                            done();
                        })

                    })
                    .catch(error =>{
                        console.log('ERROR: ',error);
                    })

            })
            .catch(error =>{
                console.log('ERROR: ',error)
            })
    })
})
