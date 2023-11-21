import router from "./init.js";
import { findSocketId } from '@utils/useSocketStore.js'
import { validateEmit } from "@valid/emitMsgValid.js";

router.get('/change', (ctx) => {
  const query = ctx.request.query
  const roomId = query.roomId
  const userId = query.userId
  const num = query.num
  const socketId = findSocketId(roomId, userId)
  if (socketId) {
    global.socketServer.to(socketId).emit('roomSize', num)
    // global.socketServer.to(roomId).emit('changeRoomSize',num)  发送消息给某个房间
    // global.socketServer.emit('changeRoomSize',num)  发送消息给全局
    ctx.success('修改成功')
  } else {
    ctx.fail('未找到用户')
  }
})

router.post('/emitMsg', (ctx) => {
  const params = ctx.request.body
  validateEmit(params)
  const { receiver, roomId, uid, eventName, msgType, msg } = params
  if (receiver == 1) {
    const socketId = findSocketId(roomId, uid)
    if (socketId) {
      global.socketServer.to(socketId).emit(eventName, msg)
      ctx.success('发送成功')
    } else {
      ctx.fail('未找到用户')
    }
  } else if (receiver == 2) {
    global.socketServer.to(roomId).emit(eventName, msg)
    ctx.success('发送成功')
  } else {
    global.socketServer.emit(eventName, msg)
    ctx.success('发送成功')
  }
})

export default router