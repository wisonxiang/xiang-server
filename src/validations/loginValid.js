import validator from 'validator';
import { HttpException } from '@/utils/exceptions.js'
import { decrypt, encrypt } from "@/utils/crypto.js";

function responseError(msg, code) {
  throw new HttpException(msg, code)
}

export function validateLogin(params) {
  const { username, passwd } = params
  const t = passwd.slice(-13)
  const cT = +new Date()
  const pd = passwd.split(t)[0]
  const privateKey = decrypt(pd, t)
  if (!username) {
    return responseError('用户名不能为空')
  }
  if (!privateKey) {
    return responseError('密码不能为空')
  }
  if (cT - +t > 60000) {
    return responseError('密码过期')
  }
  const realPasswd = encrypt(privateKey)
  return { username, realPasswd }
}

export function validateRegster(params) {
  const { username, realPasswd } = validateLogin(params)
  const { email } = params
  if (!validator.isEmail(email)) {
    return responseError('邮箱不合法')
  }
  return { username, realPasswd, email }
}