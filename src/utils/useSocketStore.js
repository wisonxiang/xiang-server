// [{roomId:'xx',userList:[{uid:'xx',sId:'yy'}]}]
const socketStore = []


export function addSocketUser(userInfo,socketid){
  const room = socketStore.find(item => (item.roomId === userInfo.roomId))
  if (room) {
    const user = room.userList.find(node => node.uid === userInfo.userId)
    if (user) {
      user.sid = socketid
    } else {
      room.userList.push({ uid: userInfo.userId, sid: socketid })
    }
  }else{
    socketStore.push({roomId:userInfo.roomId,userList:[{ uid: userInfo.userId, sid: socketid }]})
  }
}

export function findSocketId(roomId,uid){
  const room = socketStore.find(item=>item.roomId === roomId)
  if(!room) return false
  const user = room.userList.find(node=>node.uid === uid)
  if(!user) return false
  return user.sid
}
