const express = require('express')
const server = express()

server.listen(3001, () => {
    console.log('3001监听就绪')
})