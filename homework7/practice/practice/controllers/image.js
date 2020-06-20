const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const UserModel = require('../models/user');
module.exports = {
    array: async(req, res) =>{
        const images = req.files;
        const userIdx = req.decoded.userIdx;
        console.log(images);
        if(images === undefined){
            return res.status(CODE.OK).send(util.success(CODE.BAD_REQUEST, "이미지를 첨부하세요"));
        }
        const locations = images.map(img =>img.location);
        for (location of locations) {
            await UserModel.updateSelfies(location, userIdx);
        }
        res.status(CODE.OK).send(util.success(CODE.OK, images.length + "개의 이미지 저장 성공", {
            image: locations
        }));
    }
}