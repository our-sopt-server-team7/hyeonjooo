const encryption = require('../modules/encryption');
const posts = require('../models/post');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');

module.exports = {
    readAllPost: async(req, res) => {
        const data = await posts.getAllPost();
        return res.status(statusCode.OK).send(util.success(statusCode.OK, "모든 포스트 불러오기 성공", data));
    }
}