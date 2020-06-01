const Sequelize=require('sequelize')
const config=require('../config')
const db=config.db

const sequelize = new Sequelize(
    db.name,
    db.user,
    db.password,{
        logging:false,
        host:db.host,
        dialect:'mysql'
    })
// 微信群
const weixinRoomEntity=require('./weixinRoomEntity')(sequelize)
// 微信群用户
const weixinRoomUserEntity=require('./weixinRoomUserEntity')(sequelize)
// 微信群积分
const weixinRoomSigninEntity=require('./weixinRoomSigninEntity')(sequelize)

module.exports={
    sequelize,
    weixinRoomEntity,
    weixinRoomUserEntity,
    weixinRoomSigninEntity
}