const Sequelize=require('sequelize')
module.exports=(sequelize)=>{
    const weixinRoomSigninEntity=sequelize.define('weixin_room_signin',{
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
        score:{
            type:Sequelize.STRING
        },
        ownerid:{
            type:Sequelize.INTEGER
        },
        create_time:{
            type:Sequelize.INTEGER
        }
    },{
        timestamps:false,
        freezeTableName:true
    })
    return weixinRoomSigninEntity
}