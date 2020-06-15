const encryption = require('../modules/encryption');
const users = require('../models/user');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const crypto = require('crypto');

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
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, "아이디있어"));
        }
        const salt = 'dfw23EFVR3fefnd68FW3r4343';
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');

        // User.push({id, name, password, email});
        const idx = await users.signup(id, name, hashedPassword, salt, email);
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
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        if(await users.checkUser(id) === false)
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));

        const user = await users.signin(id, password);
        if(user === false)
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));

        return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {id: id}));

        // const user = users.filter(user => user.id == id);
        // if (user.length == 0) {
        //     res.status(statusCode.BAD_REQUEST)
        //         .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        //     return;
        // }
        // if (user[0].password !== password ) {
        //     res.status(statusCode.BAD_REQUEST)
        //     .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
        //     return;
        // }
        // res.status(statusCode.OK)
        //     .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {userId: id}));
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