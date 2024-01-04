import { Server } from 'socket.io';
import { addSocketUser, delSocketUser } from './useSocketStore.js';

function initSocket(httpServer) {
  // 初始化创建socket服务
  const socketServer = new Server(httpServer, {
    path: '/socket',
    cors: {
      origin: 'http://localhost:5173',
    },
  });
  // 监听客户端用户socket连接
  const fddSocket = socketServer.of('/fdd');
  fddSocket.on('connection', (socket) => {
    console.log('connection');
    let userInfo = null;
    let myRoom = null;
    // 监听socket用户加入房间
    socket.on('join', (obj, callback) => {
      userInfo = obj;
      // 加入房间的同时，记录好加入信息
      socket.join(userInfo.roomId);
      addSocketUser(userInfo, socket.id);
      myRoom = fddSocket.adapter.rooms.get(userInfo.roomId);
      const roomSize = (myRoom && myRoom.size) || 0;
      socket.to(userInfo.roomId).emit('roomSize', roomSize);
      callback(roomSize);
    });
    // 监听socket用户离开房间
    socket.on('leave', (obj, callback) => {
      if (userInfo && userInfo.roomId) {
        // 离开房间的同时，记录离开信息
        socket.leave(userInfo.roomId);
        delSocketUser(userInfo, socket.id);
        myRoom = fddSocket.adapter.rooms.get(userInfo.roomId);
        const roomSize = (myRoom && myRoom.size) || 0;
        socket.to(userInfo.roomId).emit('roomSize', roomSize);
        callback(roomSize);
      }
    });

    socket.on('sendMsg', (msg, callback) => {
      const time = +new Date() + '';
      const msgObj = { ...userInfo, msg, time };
      socket.to(userInfo.roomId).emit('sendMsg', msgObj);
      callback(msgObj);
    });

    socket.on('disconnect', () => {
      if (userInfo && userInfo.roomId) {
        socket.to(userInfo.roomId).emit('roomSize', myRoom.size);
        delSocketUser(userInfo);
      }
    });
  });
  global.fddSocket = fddSocket;
}

export default initSocket;
