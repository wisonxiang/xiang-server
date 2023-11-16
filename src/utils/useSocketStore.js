const socketMap = new Map()


export function addSocketUser(userInfo, socketid) {
  const room = socketMap.get(userInfo.roomId)
  if (!room) {
    socketMap.set(userInfo.roomId, new Map([[userInfo.userId, socketid]]))
  } else {
    room.set(userInfo.userId, socketid)
  }
}

export function findSocketId(roomId,userId) {
  const room = socketMap.get(roomId)
  if(!room) return false
  const user = room.get(userId)
  if(!user) return false
  return user
}

export function delSocketUser(userInfo) {
  const room = socketMap.get(userInfo.roomId)
  if(!room) return false
  room.delete(userInfo.userId)
}
