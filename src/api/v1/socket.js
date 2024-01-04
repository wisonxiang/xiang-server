import router from './init.js';
import { findSocketId } from '@/socket/useSocketStore.js';
import { validateSendMsg } from '@/validations/sendMsg.js';

router.post('/socket/send-msg', (ctx) => {
  const params = ctx.request.body;
  validateSendMsg(params);
  const { receiver, roomId, uid, eventName, msgType, msg } = params;
  if (receiver == 1) {
    const socketId = findSocketId(roomId, uid);
    let aMsg = msg;
    try {
      aMsg = JSON.parse(msg);
    } catch (error) { }
    if (socketId) {
      global.fddSocket.to(socketId).emit(eventName, aMsg);
      ctx.success('发送成功');
    } else {
      ctx.fail('未找到用户');
    }
  } else if (receiver == 2) {
    global.fddSocket.to(roomId).emit(eventName, aMsg);
    ctx.success('发送成功');
  } else {
    global.fddSocket.emit(eventName, aMsg);
    ctx.success('发送成功');
  }
});

export default router;
