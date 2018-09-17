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
describe('Comment',()=>{
    beforeEach((done) => {
        User.create({
            name : 'Indro',
            email : 'indro@indro.com',
            password : 'indro'
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
                    // console.log('ID AWAL------------------>',getId)
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
            // console.log('Hasil Edit-->',res.body)
            expect(res).to.have.status(200);
            // expect(res.body).to.be.a('object');
            // expect(res.body).to.have.a.property('msg');
            // expect(res.body.data).to.have.a.property('title');
            done();
        })
    })

    // show all comments
    it('should create comments',function(done){
        // console.log('ID BEFORE EDIT---->',getId)
        
        chai.request(app)
        .get('/comments/lists')
        
        .end((err,res)=>{
            // console.log('Hasil Create comments-->',res.body)
            expect(res).to.have.status(200);
            // expect(res.body).to.be.a('object');
            // expect(res.body).to.have.a.property('msg');
            // expect(res.body.data).to.have.a.property('title');
            done();
        })
    })

    afterEach((done)=>{
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
})
