const {sequelize,weixinRoomEntity,weixinRoomSigninEntity}=require('../models')
var moment = require('moment')
const {defaultScore}=require('../config')
// 管理员命令
const administrator_cmds={
    '签到开启':async (msg,room)=>{
        // 群托管签到
        let _roomId=room.id
        let _rooms=await weixinRoomEntity.findAll({
            where:{
                roomid:_roomId
            }
        })
        if(_rooms.length==0){
            // 托管群
            await weixinRoomEntity.create({
                roomid:room.id,
                avatar:room.payload.avatar,
                topic:room.payload.topic,
                ownerid:room.payload.ownerId,
                create_time:Date.now(),
                score:defaultScore
            })
        }
        room.say(`群已经开启签到功能，签到指令如下：\n签到：进行群签到；\n签到查询：签到分数查询`)
    }
}
// 普通群成员命令
const cmds={
    '签到':async (msg,room)=>{
        let _rooms=await weixinRoomEntity.findAll({
            where:{
                roomid:room.id
            }
        })
        if(_rooms.length==0){
            return
        }
        let _room=_rooms[0]
        if(_room.status==0){
            return
        }
        let from=msg.from()
        await weixinRoomSigninEntity.create({
            roomid:room.id,
            wxid:from.id,
            score:_room.score,
            create_time:parseInt(moment().format('yyyyMMDD'))
        })
        // 查询总积分
        let _scores=await weixinRoomSigninEntity.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('score')), 'scores']],
            where:{
                roomid:room.id,
                wxid:from.id
            }
        })
        room.say(`\n您今天已签到成功~，添加积分${_room.score}分\n当前总积分：${_scores[0].dataValues.scores}分`,from)
    },
    '查询':async (msg,room)=>{
        let _rooms=await weixinRoomEntity.findAll({
            where:{
                roomid:room.id
            }
        })
        if(_rooms.length==0){
            return
        }
        let _room=_rooms[0]
        if(_room.status==0){
            return
        }
        let from=msg.from()
        await weixinRoomSigninEntity.create({
            roomid:room.id,
            wxid:from.id,
            score:_room.score,
            create_time:parseInt(moment().format('yyyyMMDD'))
        })
        // 查询总积分
        let _scores=await weixinRoomSigninEntity.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('score')), 'scores']],
            where:{
                roomid:room.id,
                wxid:from.id
            }
        })
        room.say(`\您当前总积分：${_scores[0].dataValues.scores}分`,from)
    }
}

module.exports={
    administrator_cmds,
    cmds
}