import { HttpException } from '@utils/exceptions.js'

function responseError(msg, code) {
  throw new HttpException(msg, code)
}

export function validateEmit(params) {
  const { receiver, roomId, uid, eventName, msgType, msg } = params
  let txt = ''

  if (!receiver) {
    txt += '接收方不能为空;'
  }
  if (![1, 2, 3].includes(receiver)) {
    txt += '接收方类型错误;'
  }
  if (receiver == 1 || receiver == 2) {
    if (!roomId) {
      txt += '房间号不能为空;'
    }
  }
  if (receiver == 2) {
    if (!uid) {
      txt += '用户id不能为空;'
    }
  }
  if (!eventName) {
    txt += '事件名称不能为空;'
  }
  if (!msgType) {
    txt += '消息类型不能为空;'
  }
  if ([1.2].includes(msgType)) {
    txt += '消息类型错误;'
  }
  if (msgType == 2) {
    try {
      JSON.parse(msg)
    } catch (error) {
      txt += '消息不是JSON格式'
    }
  }
  if (!msg) {
    txt += '消息不能为空'
  }
  if (txt) {
    responseError(txt)
  }
}