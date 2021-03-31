const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')
const jwt = require('jsonwebtoken')
router.use(express.urlencoded())

const multer = require('multer')
// const upload = multer({dest: 'uploads'})
// 精细化去设置，如何去保存文件
const storage = multer.diskStorage({
    // 保存在哪里
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    // 保存时，文件名叫什么
    filename: function (req, file, cb) {
        // console.log('file', file)
        // 目标： 新名字是时间戳+后缀名
        const filenameArr = file.originalname.split('.');
        // filenameArr.length-1是找到最后一个元素的下标
        const fileName = Date.now() + "." + filenameArr[filenameArr.length - 1]
        cb(null, fileName) //
    }
})

// 用户信息
router.get('/userinfo', (req, res) => {
    console.log(req.query)
    const {username} = req.query
    const sqlStrSelect = `select * from users where username="${username}"`
    conn.query(sqlStrSelect, (err, result) => {
        console.log(result)
        if (err) {
            console.log(err)
            res.json({status: 500, msg: '获取失败'})
            return
        }
        res.json({status: 0, msg: '获取成功', data: result[0]})
    })
})

// 更新用户的基本信息
router.post('/userinfo', (req, res) => {
    console.log(req.body)
    const {id, nickname, email, userPic} = req.body
    let condition = []
    if (id) {
        condition.push(`id=${id}`)
    }
    if (nickname) {
        condition.push(`nickname="${nickname}"`)
    }
    if (email) {
        condition.push(`email="${email}"`)
    }
    if (userPic) {
        condition.push(`userPic="${userPic}"`)
    }
    const conditionStr = condition.join()

    const sqlStr = `update users set ${conditionStr} where id=${id}`

    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err)
            res.json({status: 500, msg: '修改失败'})
            return
        }
        res.json({status: 0, msg: '修改成功',})
    })
})

// 上传图片
const upload = multer({storage})
router.post('/uploadPic', upload.single('file_data'), ((req, res) => {
    console.log('接收到的文件是：', req.file)
    res.json({
        status: 0,
        msg: '文件上传成功',
        src: 'http://127.0.0.1:3001/uploads/' + req.file.filename
    })
}))

// 重置密码
router.post('/updatepwd', ((req, res) => {
    console.log(req.body)
    const {id, oldPwd, newPwd} = req.body
    const sqlStrSelect = `select password from users where id=${id}`
    conn.query(sqlStrSelect, (err, result) => {
        if (err) {
            console.log(err)
            res.json({status: 500, msg: '服务器失败'})
            return
        }
        if (result[0] !== oldPwd) {
            console.log(err)
            res.json({status: 1, msg: '旧密码错误'})
        }
    })
    const sqlStr = `update users set password="${newPwd}" where id="${id}"`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err)
            res.json({status: 500, msg: '服务器失败'})
            return
        }
        res.json({status: 0, msg: '密码修改成功'})
    })
}))



module.exports = router
