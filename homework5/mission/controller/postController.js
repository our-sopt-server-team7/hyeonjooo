const encryption = require('../modules/encryption');
const posts = require('../models/post');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const moment = require('moment');
const pool = require('../modules/pool');

module.exports = {
    readAllPost: async(req, res) => {
        const data = await posts.getAllPost();
        return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.readAllPost, data));
    },

    readOnePost: async(req, res) =>{
        const postIdx = req.params.postIdx;
        if(!postIdx){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }
        const data = await posts.getOnePost(postIdx);
        return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_POST, data));
    },

    createPost: async(req, res) =>{
        const {author, title, content} = req.body;
        const createdAt = moment().format('DD/MM/YYYY');

        if(!author || !title || !content){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }

        const data = await posts.createPost(author, title, content, createdAt);
        return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CREATED_POST, {postIdx:data}));
    },

    updatePost: async(req, res) =>{
        const {author, postIdx, title, content} = req.body;
        if(!author || !postIdx || !title || !content){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }
        const data = await posts.updatePost(postIdx, title, content);
        const updatePost = await posts.getOnePost(postIdx);
        return await res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.UPDATE_POST,
            {
                title:updatePost[0].title,
                content:updatePost[0].content
            }));
    },

    deletePost : async (req,res)=>{
        const {postIdx} = req.body;
        if(!postIdx){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }
        //포스트 존재 여부 확인
        const isPost = await posts.getOnePost(postIdx);
        if(isPost[0] === undefined){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST_IDX));
        }
        
        const result = await posts.deletePost(postIdx);
        if(result.affectedRows !==1){
            return await res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR,resMessage.DELETE_FAIL));
        }
        return await res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_POST,{deletePostIdx:postIdx}));
    }
}