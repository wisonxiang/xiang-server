import router from "./init.js";
import {findSocketId} from '@utils/useSocketStore.js'

router.get('/change',(ctx)=>{
  const query = ctx.request.query
  const roomId = query.roomId
  const userId = query.userId
  const num = query.num
  const socketId = findSocketId(roomId,userId)
  if(socketId){
    global.socketServer.to(socketId).emit('changeRoomSize',num)
    // global.socketServer.to(roomId).emit('changeRoomSize',num)  发送消息给某个房间
    // global.socketServer.emit('changeRoomSize',num)  发送消息给全局
    ctx.success('修改成功')
  }else{
    ctx.fail('未找到用户')
  }
})

export default router