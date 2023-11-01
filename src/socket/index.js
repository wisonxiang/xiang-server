import { Server } from 'socket.io'

function initSocket(httpServer){
  const socketServer = new Server(httpServer, {
    path: '/socket', cors: {
      origin: "http://localhost:51063"
    }
  })

  socketServer.on('connection', (socket) => {
    // console.log('socket', socket);
  })
}


export default initSocket
