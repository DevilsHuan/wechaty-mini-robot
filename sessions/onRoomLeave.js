const {weixinRoomUserEntity}=require('../models')

/**
 * 移除群聊
 * @param {*} room 
 * @param {*} leaverList 
 */
const leaveRoomUser=async (room,leaverList)=>{
    let _roomId=room.id
    leaverList.forEach(async user=>{
        await weixinRoomUserEntity.update({
            status:0
        },{
            where:{
                roomid:_roomId,
                wxid:user.id
            }
        })
    })
}

/**
 * 添加群聊
 * @param {*} session 
 */
const onRoomLeave=(session)=>{
    /**
     * room：群聊
     * inviteeList：邀请名单
     * inviter：邀请人
     */
    return async function onRoomLeave(room, leaverList){
        await leaveRoomUser(room,leaverList)
    }
}

module.exports=onRoomLeave