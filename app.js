const express = require('express')
const router = require('./router')
const fs = require('fs')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')

//创建express应用
const app =express()

app.use(cors())
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}))
app.use(bodyParser.json({limit: '500mb'}))
app.use('/',router)



//监听 / 路径的get请求
app.get('/',function (req,res){
    res.send('hello node')
})

// 创建一个 Web 服务器,返回一个 Server 实例
const httpServer = http.createServer(app)
const SSLPORT = 18082


//使express监听5000端口发起的http请求
const serve = app.listen(5001,function () {
    const { address,port } =serve.address()
    console.log('http Serve is running on http://%s:%s', address, port);
})

httpServer.listen(SSLPORT,function () {
    console.log('http启动成功，可以通过http://localhost:%s 访问', SSLPORT);
})