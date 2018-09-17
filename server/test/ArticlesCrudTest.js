'use strict'
process.env.NODE_ENV = "test"

const assert = require('assert');
const chai = require('chai')
const chaiHttp = require('chai-http');
const User = require('../models/user');
const Article = require('../models/article');
chai.use(chaiHttp)
const expect = chai.expect
const app = require('../app');
const jwt = require('jsonwebtoken');

let getId = '';
let getName = '';
let getEmail = '';
let getPassword = '';
let getToken = '';
let getArticleId = '';

// testing get articles
describe('Articles',()=>{
    beforeEach((done) => {
        User.create({
            name : 'Dono',
            email : 'dono@dono.com',
            password : 'dono'
        })
        .then(user =>{
            // console.log('USER-->',user)
                getId = user._id;
                getName = user.name;
                getEmail = user.email;
            jwt.sign({
                user_id : user._id,
                name : user.name,
                email : user.email
            },process.env.SECRETTOKEN,(err,token)=>{
                if(token){
                    getToken = token;
                    console.log('ID AWAL------------------>',getId)
                    done();
                }else{
                    console.log('ERROR : ',err)
                }
            })
        })
        .catch(error =>{
            console.log(error)
        })        
    });

    // get lists of all articles
    it('should return lists of all articles',function(done){
        chai.request(app)
        .get('/articles/lists')
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.have.property('title');
            done();
        })
    })

    // create new articles
    it('should create a new article',function(done){
        console.log('ID Before create--->',getId)
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

    //edit articles
    it('should edit article',function(done){
        console.log('ID BEFORE EDIT---->',getId)
        // console.log('Article ID-->',getArticleId)
        // console.log('TOKEN TESTING----->',getToken);
        chai.request(app)
        .put(`/articles/edit/${getArticleId}`)
        .set('token',getToken)
        .send({
            title : `Edit Article `+ new Date(),
            description : 'Hasil Edit article biasa....'
        })
        .end((err,res)=>{
            console.log('Hasil Edit-->',res.body)
            expect(res).to.have.status(200);
            // expect(res.body).to.be.a('object');
            // expect(res.body).to.have.a.property('msg');
            // expect(res.body.data).to.have.a.property('title');
            done();
        })
    })

    // delete article
    it('should delete article',function(done){
        console.log('ID BEFORE Delete---->',getId)
        // console.log('Article ID-->',getArticleId)
        // console.log('TOKEN TESTING----->',getToken);
        chai.request(app)
        .delete(`/articles/delete/${getArticleId}`)
        .set('token',getToken)
        .end((err,res)=>{
            console.log('Hasil Delete-->',res.body)
            expect(res).to.have.status(200);
            // expect(res.body).to.be.a('object');
            // expect(res.body).to.have.a.property('msg');
            // expect(res.body.data).to.have.a.property('title');
            done();
        })
    })

    afterEach((done)=>{
        User.findOneAndRemove({
            email : 'dono@dono.com'
        })
        .then( user =>{

            done()
        })
        .catch(error =>{
            // console.log('AFTER DELETE-->',error)
            done();
        })
    })
})
