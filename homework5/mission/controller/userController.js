const encryption = require('../modules/encryption');
const users = require('../models/user');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const crypto = require('crypto');
const jwt = require('../modules/jwt');

module.exports = {
    signup : async(req,res) =>{
        const {
            id,
            name,
            password,
            email
        } = req.body;
        if (!id || !name || !password || !email) {            
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }
        // 사용중인 아이디가 있는지 확인
        const check = await users.checkUser(id);
        if (check) {
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        }
        const salt = await encryption.salt();
        const idx = await users.signup(id, name, password, salt, email);
        if (idx === -1) {
            return await res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CREATED_USER, {userId: idx}));
    },

    signin : async(req, res) =>{
        const {
            id,
            password
        } = req.body;
        if (!id || !password) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }

        if(await users.checkUser(id) === false)
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));

        const result = await users.signin(id);
        const originPassword = result[0].password;
        const originSalt = result[0].salt;
        const hashedPassword = await encryption.encrypt(password, originSalt);
        
        if(originPassword !== hashedPassword)
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
            
        const {token, _} = await jwt.sign(result[0]);
        return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {accessToken : token}));
    },

    getUserById: async (req, res) => {
        const {
            id
        } = req.body;

        const idCheck = await users.checkUser(id);
        //id가 있는지 확인
        if (!idCheck) {
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        }
        const result = await users.getUserById(id);
        const user = {
            "id": result[0].id,
            "name": result[0].name,
            "email": result[0].email
        };
        return await res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, user));
    }
}