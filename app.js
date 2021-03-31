const express = require('express')
const server = express()

// 跨域设置
const cors = require('cors')
server.use(cors())



server.listen(3001, () => {
    console.log('3001监听就绪')
})