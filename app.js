const express = require('express')
const server = express()

// 跨域设置
const cors = require('cors')
server.use(cors())

// 静态资源托管
server.use('/uploads', express.static('uploads'))

// jwt生成token
const jwt = require('express-jwt')
// app.use(jwt().unless());
// jwt() 用于解析token，并将 token 中保存的数据 赋值给 req.user
// unless() 约定某个接口不需要身份认证
server.use(jwt({
    secret: 'bignews',      // 生成token时的 钥匙，必须统一
    algorithms: ['HS256']       // 必填，加密算法，无需了解
}).unless({
    path: ['/user/login', '/user/register', /^\/uploads\/.*/] // 除了这两个接口，其他都需要认证
}));

// 通过路由中间件来 加载不同的路由
const userRouter = require('./router/user_router.js')
const accountRouter = require('./router/account_router.js')
const cateRouter = require('./router/cate_router.js')
server.use('/my', userRouter);
server.use('/api', accountRouter)
server.use('/my/article', cateRouter)

// 错误中间件处理
server.use((err, req, res, next) => {
    console.log('有错误', err)
    if (err.name === 'UnauthorizedError') {
        // res.status(401).send('invalid token...');
        res.status(401).send({ code: 1, message: '身份认证失败！' });
    }
});

server.listen(3001, () => {
    console.log('3001监听就绪')
})