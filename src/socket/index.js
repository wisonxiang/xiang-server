import { Server } from 'socket.io'
import { addSocketUser, delSocketUser } from '@utils/useSocketStore.js'


function initSocket(httpServer) {
  const socketServer = new Server(httpServer, {
    path: '/socket', cors: {
      origin: "http://localhost:5173"
    }
  })

  socketServer.on('connection', (socket) => {
    // console.log('socket', socket);
    console.log('connection');
    let userInfo = null
    let myRoom = null
    socket.on('join', (obj, callback) => {
      userInfo = obj
      socket.join(userInfo.roomId)
      addSocketUser(userInfo, socket.id)
      myRoom = socketServer.sockets.adapter.rooms.get(userInfo.roomId)
      const roomSize = myRoom.size
      socket.to(userInfo.roomId).emit('roomSize', roomSize)
      callback(roomSize)
    })

    socket.on('leave', (obj, callback) => {
      if (userInfo && userInfo.roomId) {
        socket.leave(userInfo.roomId)
        delSocketUser(userInfo, socket.id)
        myRoom = socketServer.sockets.adapter.rooms.get(userInfo.roomId)
        const roomSize = myRoom.size
        socket.to(userInfo.roomId).emit('roomSize', roomSize)
        callback(roomSize)
      }
    })

    socket.on('sendMsg', (msg, callback) => {
      const time = +new Date() + ''
      const msgObj = { ...userInfo, msg, time }
      socket.to(userInfo.roomId).emit('sendMsg', msgObj)
      callback(msgObj)
    })

    socket.on('disconnect', () => {
      if (userInfo && userInfo.roomId) {
        socket.to(userInfo.roomId).emit('roomSize', myRoom.size)
        delSocketUser(userInfo)
      }
    })
  })
  global.socketServer = socketServer
}


export default initSocket
