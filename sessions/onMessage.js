const { Message } = require("wechaty")
const {administrator_cmds,cmds}=require('../commands')

/**
 * 微信消息回调
 * @param {*} session 
 * @param {*} robot 
 */
const onMessage=(session)=>{
    return async function onMessage(msg){
        let from=msg.from()
        let to=msg.to()
        let text=msg.text()
        let room=msg.room()
        if (msg.type() != Message.Type.Text) {
            return
        }
        if(room){
            await onRoomMessage(session,msg)
        }
        console.log('======================')
        console.log(`from:${from}`)
        console.log(`to:${to}`)
        console.log(`text:${text}`)
        console.log('======================')
    }
}

/**
 * 群消息处理
 * @param {*} session 
 * @param {*} robot 
 */
const onRoomMessage=(session,msg)=>{
    let room=msg.room()
    let roomId=room.id
    let text=msg.text()
    // 管理员接入
    if (msg.self()) {
        if(administrator_cmds[text]){
            administrator_cmds[text](msg,room)
        }
        //return
    }
    if(session.options.rooms.indexOf(roomId)!=-1){
        let _cmd=cmds[text] || cmds["默认"]
        _cmd(msg,room)
    }
}

module.exports=onMessage