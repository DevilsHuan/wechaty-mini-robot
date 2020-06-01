const {weixinRoomUserEntity}=require('../models')
const replay=`\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，以下为群运营命令关键字！ \n
1、签到：签到加分\n
2、查询：签到积分查询\n
😊`
/**
 * 房间用户存储
 * @param {*} room 
 * @param {*} users 
 */
const saveRoomUser=async (room,users,from_wxid)=>{
    let _roomId=room.id
    const wxids=[]
    users.forEach(async user=>{
        if(wxids.indexOf(user.id)==-1){
            wxids.push(user.id)
            let _users=await weixinRoomUserEntity.findAll({
                where:{
                    roomid:_roomId,
                    wxid:user.id
                }
            })
            console.log(`${user.id}:${_users.length}`)
            if(_users.length>0){
                if(_users[0].status!=1){
                    // 更新群状态
                    await weixinRoomUserEntity.update({
                        status:1
                    },{
                        where:{
                            roomid:_roomId,
                            wxid:user.id
                        }
                    })
                }
            }else{
                await weixinRoomUserEntity.create({
                    roomid:_roomId,
                    wxid:user.id,
                    avatar:user.payload.avatar,
                    name:user.payload.name,
                    create_time:Date.now(),
                    from_wxid:from_wxid
                })
            }
        }
    })
    
}

/**
 * 添加群聊
 * @param {*} session 
 */
const onRoomJoin=(session)=>{
    /**
     * room：群聊
     * inviteeList：邀请名单
     * inviter：邀请人
     */
    return async function onRoomJoin(room, inviteeList, inviter){
        console.log(inviteeList.length)
        await saveRoomUser(room,[inviter])
        await saveRoomUser(room,inviteeList,inviter.id)
        if(session.trustRoom(room.id)){
            inviteeList.map(c => {
                // 发送消息并@
                room.say(replay, c)
            })
        }
    }
}

module.exports=onRoomJoin