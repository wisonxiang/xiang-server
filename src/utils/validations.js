import validator from 'validator';
import { HttpException } from '@utils/exceptions.js'

function responseError(msg,code){
  throw new HttpException(msg,code)
}

export function validateLogin(params){
  const { username, passwd } = params
  const t = passwd.slice(-13)
  const cT = +new Date()

  if(!username){
    return responseError('用户名不能为空')
  }
  if(!passwd){
    return responseError('密码不能为空')
  }
  if (cT - +t > 60000) {
   return responseError('密码过期')
  }
}

export function validateRegster(params) {
  validateLogin(params)
  if (validator.isEmail(email)) {
    return responseError('邮箱不合法')
  }
}