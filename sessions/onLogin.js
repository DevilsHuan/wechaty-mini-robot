// 登陆相关监听
const onLogin=(session)=>{
    let robot=session.robot
    robot.on('login',()=>{
        session.setLogin(true)
    })
}

module.exports=onLogin