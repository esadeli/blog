'use strict'

const Crypto = require('crypto');

function HashPassword(input){
    const secret = process.env.SECRET;
    const hash = Crypto.createHmac('sha256',secret)
                    .update(input)
                    .digest('hex')
    
    return hash;                
}

module.exports = HashPassword