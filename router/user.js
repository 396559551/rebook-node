const express = require('express')
const Result = require('../models/Result')
const { login,findUser } = require('../services/user')
const { md5,decoded } = require('../utils/index')
const { boom } = require('boom')
const { PWD_SALT,PRIVATE_KEY,JWT_EXPIRED } = require('../utils/constant')
const { body,validationResult } = require('express-validator')
const jwt  = require('jsonwebtoken')

const router = express.Router()

router.post('/login',
    [
        body('username').isString().withMessage('用户名必须是字符'),
        body('password').isString().withMessage('密码必须是数字')
    ],
    function (req,res,next) {
     // console.log('user/login', req.body);

      const err = validationResult(req)
      if (!err.isEmpty()) {
        const [{ msg }] =err.errors
        next(boom.badRequest(msg))//传递给下一个中间件,router/index.js 中
      } else {
        let { username,password } = req.body
        password = md5(`${password}${PWD_SALT}`)

        login(username,password).then(user => {
          if(!user || user.length === 0) {
            new Result('登录失败').fail(res)
          } else {
            const token = jwt.sign(
            { username },
            PRIVATE_KEY,
            { expiresIn: JWT_EXPIRED }
          )

            new Result({ token },'登陆成功').success(res)
          }
        })
      }


})

router.get('/info', function(req, res,next) {
  const decode = decoded(req)
  if (decode && decode.username) {
    findUser(decode.username).then(user => {
    //console.log(user);
    if (user) {
      user.roles = [user.role]//传给前端的roles
      new Result(user,'用户信息查询成功').success(res)
    } else {
      new Result('用户信息查询失败').fail(res)
    }
  })
  } else {
    new Result('用户信息查询失败').fail(res)
  }


})

module.exports = router