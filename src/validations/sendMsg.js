import { responseError } from '@/utils/exceptions.js';
import { isEmpty, includes } from 'lodash';

const receiverOptions = {
  personal: 1,
  room: 2,
  global: 3,
};
const msgTypeOptions = {
  string: 1,
  json: 2,
};

export function validateSendMsg(params) {
  const { receiver, roomId, uid, eventName, msgType, msg } = params;
  const errs = {};
  if (!includes(receiverOptions, +receiver)) {
    errs.receiver = `数据超出范围[1, 2, 3]`;
  }
  if (
    receiver == receiverOptions.personal ||
    receiver == receiverOptions.room
  ) {
    if (!roomId) {
      errs.roomId = '不能为空';
    }
  }
  if (receiver == receiverOptions.room) {
    if (!uid) {
      errs.roomId = '不能为空';
    }
  }
  if (!eventName) {
    errs.eventName = '不能为空';
  }
  if (!includes(msgTypeOptions, +msgType)) {
    errs.msgType = `数据超出范围[1, 2]`;
  }
  if (msgType == msgTypeOptions.json) {
    try {
      JSON.parse(msg);
    } catch (error) {
      errs.msg = `数据非JSON格式`;
    }
  }
  if (!msg) {
    errs.msg = `不能为空`;
  }
  if (!isEmpty(errs)) {
    responseError(errs);
  }
}
