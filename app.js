const Koa=require('koa')
const static=require('koa-static')
const app=new Koa()
// 机器人
const {create}=require('./sessions')
create()

const router=require('./routes')
router(app)

// 客户端
app.use(static('./views'))

module.exports=app