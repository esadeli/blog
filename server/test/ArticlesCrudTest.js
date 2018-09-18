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



// testing get articles
describe('Articles',()=>{
    // let getId ;
    let getToken = '';
    let getArticleId = '';

    // data awal
    let nameAwal = 'Dono';
    let emailAwal = 'dono@dono.com'; 
    let passwordAwal = 'dono';
    beforeEach((done) => {
        User.create({
            name : nameAwal,
            email : emailAwal,
            password : passwordAwal
        })
        .then(user =>{
            jwt.sign({
                user_id : user._id,
                name : nameAwal,
                email : emailAwal
            },process.env.SECRETTOKEN,(err,token)=>{
                if(token){
                    getToken = token;
                    // console.log('TOKEN before each------------------>',getToken)

                    Article.create({
                        title : 'Ini judul article',
                        description : 'Penjabaran isi article',
                        userId : user._id
                    })
                    .then(article =>{

                        getArticleId = article._id
                        done();
                    })
                    .catch(error =>{
                        console.log('ERROR: ',error);
                        done();
                    })
                }else{
                    console.log('ERROR : ',err)
                }
            })
        })
        .catch(error =>{
            console.log(error)
            done();
        })        
    });

    // create new articles
    describe('POST create new article',function(){
        it('should create a new article',function(done){
            chai.request(app)
            .post('/articles')
            .set('token',getToken)
            .send({
                title : 'Sebuah artikel kekinian',
                description : 'Perkembangan jaman pada saat ini menandakan sesuatu yang luar biasa....'
            })
            .end((err,res)=>{
                getArticleId = res.body.data._id;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.a.property('msg');
                expect(res.body.data).to.have.a.property('title');
                done();
            })
        })
    })
    
    // get lists of all articles
    describe('GET ALL articles',function(){
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
    })
    

    //edit articles
    describe('PUT edit article',function(){
        it('should edit article',function(done){
            chai.request(app)
            .put(`/articles/edit/${getArticleId}`)
            .set('token',getToken)
            .send({
                title : `Edit Article `+ new Date(),
                description : 'Hasil Edit article biasa....'
            })
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.a.property('msg');
                expect(res.body.data).to.have.a.property('title');
                done();
            })
        })
    })
    

    // delete article
    describe('DELETE one article', function(){
        it('should delete article',function(done){
            chai.request(app)
            .delete(`/articles/delete/${getArticleId}`)
            .set('token',getToken)
            .end((err,res)=>{

                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.a.property('msg');
                expect(res.body.data).to.have.a.property('title');
                done();
            })
        })
    })
    

    afterEach((done)=>{
        Article.remove({})
        .then( article =>{

            User.remove({})
                .then(user =>{
                    done()
                })
                .catch(error =>{
                    console.log('ERROR: ',error)
                    done()
                })
        })
        .catch(error =>{
            // console.log('AFTER DELETE-->',error)
            done();
        })
    })
})
