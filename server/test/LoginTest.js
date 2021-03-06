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


// individual testing login --> might be used separately if needed

// login
// describe('POST login',()=>{
//     it('should return token when login is successful',function(done){
//         chai.request(app)
//         .post('/users/login')
//         .send({
//             email : 'ali@ali.com',
//             password : 'ali'

//         })
//         .end((err,res)=>{

//             expect(res).to.have.status(200);
//             expect(res.body).to.have.property('token');
//             done();
//         })
//     })
// })

// // --------------> Negative TEST-------------------
// // unauthorized person try to login
// describe('POST login',()=>{
//     it('should not show token when login is not successful',function(done){
//         chai.request(app)
//         .post('/users/login')
//         .send({
//             email : 'ali@ali.com',
//             password : 'alibaba'

//         })
//         .end((err,res)=>{

//             expect(res).to.have.status(401);
//             expect(res.body).to.not.have.property('token');
//             done();
//         })
//     })
// })