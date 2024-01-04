## 开发调试
开发分支请切到test  

## 客户端连接方式
socket = io('/fdd', { path: '/socket' });

客户端通过 socket.emit('join', info)加入房间  
info = {uid,roomId}  
加入房间必传用户uid和房间roomId,加入房间后socket服务会记录uId和roomId,以便后续对特定房间的特定个人发送消息  
建议当打开前端页面先进行socket连接，当登录成功后再进行加入socket房间  


## 第三方服务通过socket服务向特定人发消息
调用接口：http://xxxx:xx/api/v1/socket/send-msg  POST  
const params={
  receiver, roomId, uid, eventName, msgType, msg
}  
其中  
<font color=LightSeaGreen>receiver</font>  Number [1,2,3] 1:是发送消息给个人  2:发送消息给房间内所有人 3:发送全局消息  
<font color=LightSeaGreen>roomId</font> String 房间号,发送消息给个人或房间内人时，要指定房间号  
<font color=LightSeaGreen>uid</font>  String 用户加入房间时传的id,当发消息给个人时要指定值  
<font color=LightSeaGreen>eventName</font> String 指定通过什么触发什么事件传递消息，要跟客户端约定好，客户端提前监听该事件  
<font color=LightSeaGreen>msgType</font> Number [1,2] 1:消息体是字符串  2:消息体是json字符串  
<font color=LightSeaGreen>msg</font> String  要传递给客户端的消息  