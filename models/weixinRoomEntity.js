const Sequelize=require('sequelize')
module.exports=(sequelize)=>{
    const weixinRoomEntity=sequelize.define('weixin_room',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },
        roomid:{
            type:Sequelize.STRING
        },
        avatar:{
            type:Sequelize.STRING
        },
        topic:{
            type:Sequelize.STRING
        },
        ownerid:{
            type:Sequelize.STRING
        },
        create_time:{
            type:Sequelize.INTEGER
        },
        status:{
            type:Sequelize.INTEGER
        },
        score:{
            type:Sequelize.INTEGER
        }
    },{
        timestamps:false,
        freezeTableName:true
    })
    return weixinRoomEntity
}