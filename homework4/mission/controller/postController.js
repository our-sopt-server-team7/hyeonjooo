const encryption = require('../modules/encryption');
const posts = require('../models/post');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const moment = require('moment');

module.exports = {
    readAllPost: async(req, res) => {
        const data = await posts.getAllPost();
        return res.status(statusCode.OK).send(util.success(statusCode.OK, "모든 포스트 불러오기 성공", data));
    },

    readOnePost: async(req, res) =>{
        const postIdx = req.params.postIdx;
        if(!postIdx){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }
        const data = await posts.getOnePost(postIdx);
        return res.status(statusCode.OK).send(util.success(statusCode.OK, "1개 포스트 불러오기 성공", data));
    },

    createPost: async(req, res) =>{
        const author = req.userIdx;
        const {title, content} = req.body;
        const createdAt = moment().format('DD/MM/YYYY');

        
    }
}