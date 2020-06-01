const robot=require('./robot')
const router=function(app){
    app.use(robot.routes())
}

module.exports=router