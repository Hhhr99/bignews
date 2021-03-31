const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')
const jwt = require('jsonwebtoken')
router.use(express.urlencoded())

// 用户注册接口
router.post('/register', ((req, res) => {
    console.log(req.body)
    const {username, password} = req.body
    // 拼接
    const sqlStrSelect = `select username from users where username="${username}"`
    conn.query(sqlStrSelect, (err, result) => {
        // 查询数据库错误
        if (err) {
            console.log(err)
            res.json({status: 500, msg: '服务器错误'})
            return
        }
        console.log(result)
        if (result.length > 0) {
            res.json({status: 1, msg: '该名字已被占用'})
            return;
        }
    })
    // 名字没有被占用
    const sqlStr = `insert into users (username,password) values("${username}","${password}")`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err)
            res.json({status: 500, msg: '服务器错误'})
            return
        }
        res.json({status: 0, msg: '注册成功'})
    })
}))

// 用户登录接口
router.post('/login', (req, res) => {
    // console.log(req.body)
    const {username, password} = req.body
    const sqlStr = `select * from users where username="${username}" and password="${password}"`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err)
            res.json({status: 500, msg: '服务器错误'})
            return
        }
        console.log('查询结果是：', result)
        // 查找到了，说明登陆成功
        // 返回token
        if (result.length > 0) {
            const token = 'Bearer ' + jwt.sign(
                {name: username},
                'bignews',// 加密的密码，要与express-jwt中的验证密码一致
                {expiresIn: 7200}// 过期时间，单位是秒
            )
            res.json({status: 0, msg: '登录成功', token})
        } else {
            res.json({status: 1, msg: '登录失败,用户名密码不正确',})
        }
    })
})
module.exports = router
