import { Server } from 'socket.io'

function initSocket(httpServer){
  const socketServer = new Server(httpServer, {
    path: '/socket', cors: {
      origin: "http://localhost:51063"
    }
  })

  // const socketStore = new Map({})

  socketServer.on('connection', (socket) => {
    // console.log('socket', socket);
    console.log('connection');
    let userInfo = null
    let myRoom = null
    socket.on('join',(obj,callback)=>{
      userInfo = obj
      socket.join(userInfo.roomId)
      myRoom = socketServer.sockets.adapter.rooms.get(userInfo.roomId)
      const roomSize = myRoom.size
      callback(roomSize)
      socket.to(userInfo.roomId).emit('changeRoomSize',roomSize)
      // setTimeout(()=>{
      //   console.log('欢迎你');
      //   socketServer.emit('news',"欢迎你！")
      // },3000)
      // setTimeout(()=>{
      //   socket.disconnect()
      // },3000)
    })

    socket.on('sendMsg',(msg,callback)=>{
      const time = +new Date() + ''
      const msgObj = {...userInfo,msg,time}
      callback(msgObj)
      socket.to(userInfo.roomId).emit('sendMsg',msgObj)
    })

    socket.on('disconnect',()=>{
      socket.to(userInfo.roomId).emit('changeRoomSize',myRoom.size)
    })
  })
}


export default initSocket
