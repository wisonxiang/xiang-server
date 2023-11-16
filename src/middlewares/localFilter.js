import { HttpException } from '@utils/exceptions.js'
import { jwtVerify } from '@utils/jwt'
import sql from '@utils/db.js'
//定义允许直接访问的url
const allowPages = ['/api/v1/login','/api/v1/register']
//拦截
export default async function localFilter(ctx,next) {
    let url = ctx.originalUrl
    if (allowPages.indexOf(url) > -1) {
      await next()
    }else {
        const token = ctx.header.authorization
        if(!token){
          throw new HttpException('token不能为空',403)
        }
        try {
          const tokenObj =  jwtVerify(token)
          const res = await sql.query('select uid,username,email from user where uid = ?', [tokenObj.uid]);
          ctx.userinfo = res[0][0]
        } catch (error) {
          console.log('err',error);
          throw new HttpException('token校验失败',403)
        }
        await next()
    }
}