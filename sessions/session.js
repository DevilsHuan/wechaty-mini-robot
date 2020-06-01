const { ScanStatus }=require('wechaty-puppet')
const onLogin=require('./onLogin')
const onMessage=require('./onMessage')
const onRoomJoin=require('./onRoomJoin')
const onRoomLeave=require('./onRoomLeave')
// 默认机器人业务配置
const defaultOptions={
    // 托管群
    rooms:['23344489937@chatroom'],
    // 托管任务
    tasks:[]
}

class session{
    constructor(name,robot,options){
        this.name=name
        this.robot=robot
        this.qrcode=null
        this.logined=false
        this.options={
            ...defaultOptions,
            ...options
        }
        this._init()
    }
    _init(){
        this.robot.on('scan', (qrcode, status) => {
            if (status === ScanStatus.Waiting) {
                this.qrcode=qrcode
            }
        })
        this.robot.on('message',onMessage(this,this.robot))
        this.robot.on('room-join',onRoomJoin(this))
        this.robot.on('room-leave',onRoomLeave(this))
        onLogin(this)
        this.robot.start()
    }
    setLogin(status){
        this.logined=status
    }
    trustRoom(roomId){
        return this.options.rooms.indexOf(roomId)!=-1
    }
}

module.exports=session