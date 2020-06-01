const router=require('koa-router')()
const {create}=require('../sessions')
const {sequelize}=require('../models')
router.prefix('/robot')

// 机器人初始化
router.get('/start',ctx=>{
    // 创建机器人
    let _session=create()
    let _instance=_session.robot
    if(_instance.logonoff()){
        ctx.body=''
    }else{
        ctx.body=`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(_session.qrcode)}`
    }
})
// 机器人登陆状态获取
router.get('/logonoff',ctx=>{
    let _session=create()
    if(_session.logined){
        ctx.body='logined'
    }else{
        ctx.body='loging'
    }
})
// 联系人获取
router.get('/room',async ctx=>{
    let _session=create().robot
    const roomList = await _session.Room.findAll()
    ctx.body=roomList
})
// 群积分查询
router.get('/room/:id',async ctx=>{
    let _sql=`select u.*,s.scores from weixin_room_user u left join 
    (select roomid,wxid,sum(score) scores from weixin_room_signin group by roomid,wxid) s
    on u.roomid=s.roomid and u.wxid=s.wxid where u.roomid=?`
    ctx.body=await sequelize.query(_sql,{
        replacements:[ctx.params.id],
        type : sequelize.QueryTypes.SELECT
    })
})
module.exports=router