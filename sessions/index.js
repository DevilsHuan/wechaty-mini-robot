const { Wechaty }=require('wechaty')
const { PuppetPadplus }=require('wechaty-puppet-padplus')
const config=require('../config')
const session=require('./session')
// session 配置
const __name__='minibot'
const token=config.token
const sessions={}

const create=function(name){
    // 默认创建机器人
    name=name || __name__
    if(sessions[name]){
        return sessions[name]
    }
    // 单token，多token可根据name来设置
    const puppet = new PuppetPadplus({
        token
    })
    // ${name}.memory-card.json 为机器人会话保持
    let _robot=new Wechaty({
        puppet,
        name
    })
    sessions[name]=new session(
        name,
        _robot
    )
    return sessions[name]
}

module.exports={
    create
}