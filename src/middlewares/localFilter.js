import { HttpException } from '@utils/exceptions.js'
import { jwtVerify } from '@utils/jwt'
import { infoLog } from '@utils/log.js'
//定义允许直接访问的url
const allowPages = ['/api/v1/login', '/api/v1/register', '/api/v1/change', '/api/v1/emitMsg']
//拦截
export default async function localFilter(ctx, next) {
  let url = ctx.originalUrl.split('?')[0]
  if (allowPages.indexOf(url) > -1) {
    await next()
  } else {
    const token = ctx.header.authorization
    if (!token) {
      throw new HttpException('token不能为空', 403)
    }
    try {
      const jwtObj = jwtVerify(token)
      ctx.uid = jwtObj.uid
      await next()
    } catch (error) {
      infoLog.log('token校验失败', error)
      throw new HttpException('token校验失败', 403)
    }
  }
}