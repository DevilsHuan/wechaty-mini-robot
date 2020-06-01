const Sequelize=require('sequelize')
module.exports=(sequelize)=>{
    const weixinRoomUserEntity=sequelize.define('weixin_room_user',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },
        roomid:{
            type:Sequelize.STRING
        },
        wxid:{
            type:Sequelize.STRING
        },
        avatar:{
            type:Sequelize.STRING
        },
        name:{
            type:Sequelize.STRING
        },
        from_wxid:{
            type:Sequelize.STRING
        },
        create_time:{
            type:Sequelize.INTEGER
        },
        status:{
            type:Sequelize.INTEGER
        }
    },{
        timestamps:false,
        freezeTableName:true
    })
    return weixinRoomUserEntity
}