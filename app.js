const express = require('express')
const server = express()

// 跨域设置
const cors = require('cors')
server.use(cors())

// 静态资源托管
server.use('/uploads',express.static('uploads'))

server.listen(3001, () => {
    console.log('3001监听就绪')
})