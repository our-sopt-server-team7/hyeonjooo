var express = require('express');
var router = express.Router();
let UserModel = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

// 1단계
// router.post('/signup', async (req, res) => {
//     const { id, name, password, email } = req.body;
//     User.push({id, name, password, email});
//     res.status(200).send(User);
// });

// 2단계
// router.post('/signup', async (req, res) => {
//     const { id, name, password, email } = req.body;
//     // request data 확인 - 없다면 Bad Request 반환
//     if ( !id || !name || !password || !email ) {
//         return res.status(400).send({ message: 'BAD REQUEST' });
//     }
//     //already ID
//     if (User.filter(user => user.id == id).length > 0) {
//         return res.status(400).send({ message: 'ALREADY ID' });
//     }
//     User.push({id, name, password, email});
//     res.status(200).send(User);
// });

// 3단계
router.post('/signup', async (req, res) => {
  const {
      id,
      name,
      password,
      email
  } = req.body;
  // request data 확인 - 없다면 Null Value 반환
  if (!id || !name || !password || !email) {
      res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
  }
  //already ID
  if (UserModel.filter(user => user.id == id).length > 0) {
      res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
      return;
  }
  UserModel.push({
      id,
      name,
      password,
      email
  });
  res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
          userId: id
      }));
});

router.post('/signin', async (req, res) => {
  // request body 에서 데이터 가져오기
  // request data 확인 - 없다면 Null Value 반환
  // 존재하는 아이디인지 확인 - 없다면 No user 반환
  // 비밀번호 확인 - 없다면 Miss match password 반환
  // 성공 - login success와 함께 user Id 반환
  const{
    id,
    password
  } = req.body;

  if(!id || !password){
    res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  const user = User.filter(user=> user.id == id);

  if(user.length == 0){
    res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }

  if(user[0].password !== password){
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
    return;
  }

  res.status(statusCode.OK)
      .send(util.success(statusCode.OK,
                        resMessage.LOGIN_SUCCESS, {userId: id}
                        )
          );
});

// router.get('/profile/:id', async (req, res) => {
//   // request params 에서 데이터 가져오기
//   // 존재하는 아이디인지 확인 - 없다면 No user 반환
//   // 성공 - login success와 함께 user Id 반환


// });

router.get('/profile/:id', async (req, res) => {
  // request params 에서 데이터 가져오기
  const id = req.params.id;
  const user = User.filter(user => user.id == id)[0];
  // 존재하는 아이디인지 확인 - 없다면 No user 반환
  if (user === undefined) {
      res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
      return;
  }
  const dto = {
      id: user.id,
      name: user.name,
      email: user.email
  }
  // 성공 - login success와 함께 user Id 반환
  res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, dto));
});
module.exports = router;