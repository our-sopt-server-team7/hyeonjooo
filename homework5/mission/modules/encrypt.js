const crypto = require('crypto');

const getSalt = (length) => {
    return crypto.randomBytes(length).toString('hex'); 
};

const encrypt = (salt, password) => {
    const key = crypto.pbkdf2Sync(password, salt.toString(), 100000, 32, 'sha512');
    return key.toString('hex');
};

//user.js에서 접근
module.exports = {
    getSalt: getSalt,
    encryption: encrypt
};