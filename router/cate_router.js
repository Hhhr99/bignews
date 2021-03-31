const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')
const jwt = require('jsonwebtoken')
router.use(express.urlencoded())

// 获取文章分类列表
router.get('/cates', ((req, res) => {
    const sqlStr = `select * from categories`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err)
            res.json({status: 500, msg: '服务器失败'})
            return
        }
        res.json({
            status: 0,
            msg: '获取文章分类列表成功！',
            data: result[0]
        })
    })
}))

// 新增文章分类
router.post('/addcates', ((req, res) => {
    let {name, slug} = req.body;
    const sqlStr = `insert into categories (name,slug) values ("${name}","${slug}")`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err)
            res.json({status: 500, msg: '服务器失败'})
            return
        }
        res.json({
            status: 0,
            msg: '新增文章分类成功！',
        })
    })
}))

// 根据 Id 删除文章分类
router.get('/deletecate', ((req, res) => {
    let {id} = req.query;
    const sqlStr = `delete from categories where id=${id}`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err)
            res.json({status: 500, msg: '服务器失败'})
            return
        }
        res.json({
            status: 0,
            msg: '删除文章分类成功！',
        })
    })
}))

// 根据 Id 获取文章分类数据
router.get('/getCatesById', ((req, res) => {
    let {id} = req.query;
    const sqlStr = `select * from categories where id=${id}`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err)
            res.json({status: 500, msg: '服务器失败'})
            return
        }
        res.json({
            status: 0,
            msg: '获取文章分类数据成功！',
            data: result[0]
        })
    })
}))


// 根据 Id 更新文章分类数据
router.post('/updatecate', ((req, res) => {
    let {id, name, slug} = req.body;
    const sqlStr = `update categories set name="${name}",slug="${slug}" where id=${id}`
    console.log(sqlStr);
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err)
            res.json({status: 500, msg: '服务器失败'})
            return
        }
        res.json({
            status: 0,
            msg: '更新分类信息成功！',
        })
    })
}))
module.exports = router