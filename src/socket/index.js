import { Server } from 'socket.io'
import { addSocketUser,delSocketUser } from '@utils/useSocketStore.js'


function initSocket(httpServer) {
  const socketServer = new Server(httpServer, {
    path: '/socket', cors: {
      origin: "http://localhost:51063"
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
      callback(roomSize)
      socket.to(userInfo.roomId).emit('changeRoomSize', roomSize)
    })

    socket.on('sendMsg', (msg, callback) => {
      const time = +new Date() + ''
      const msgObj = { ...userInfo, msg, time }
      callback(msgObj)
      socket.to(userInfo.roomId).emit('sendMsg', msgObj)
    })

    socket.on('disconnect', () => {
      socket.to(userInfo.roomId).emit('changeRoomSize', myRoom.size)
      delSocketUser(userInfo)
    })
  })
  global.socketServer = socketServer
}


export default initSocket
