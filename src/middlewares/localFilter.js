import { HttpException } from '@utils/exceptions.js'
import { jwtVerify } from '@utils/jwt'
//定义允许直接访问的url
const allowpage = ['/api/v1/login','/api/v1/register']
//拦截
export default async function localFilter(ctx,next) {
    let url = ctx.originalUrl
    if (allowpage.indexOf(url) > -1) {
      await next()
    }else {
      loh
        const token = ctx.header.authorization
        if(!token){
          throw new HttpException('登录验证失败',403)
        }
        jwtVerify(token)
        await next()
    }
}