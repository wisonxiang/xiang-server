import router from "./init.js";
import { decrypt, encrypt } from "@utils/crypto.js";
import sql from '@utils/db.js'

router.post('/login', (ctx) => {
  const val = ctx.request.body.passwd
  const t = val.slice(-13)
  const cT = +new Date()
  if (cT - +t > 60000) {
    ctx.body = {
      responseCode: 401,
      msg: 'fail'
    }
    return
  }
  const passwd = val.split(t)[0]
  const privateKey = decrypt(passwd, t)
  const realPasswd = encrypt(privateKey)
  console.log('realPasswd', realPasswd);
  ctx.body = {
    responseCode: 200,
    msg: 'success'
  }
})

router.post('/register', async (ctx) => {
  const params = ctx.request.body
  const t = params.passwd.slice(-13)
  const cT = +new Date()
  if (cT - +t > 60000) {
    ctx.body = {
      responseCode: 401,
      msg: 'fail'
    }
    return
  }
  const passwd = params.passwd.split(t)[0]
  const privateKey = decrypt(passwd, t)
  const realPasswd = encrypt(privateKey)
  const username = params.username
  const email = params.email || null
  try {
    const user = await sql.query('select * from user where username = ?;', [username])
    if (user[0].length) {
      ctx.body = {
        responseCode: 500,
        msg: '用户名已存在'
      }
    } else {
      await sql.query('insert into user (username,password,email) values (?,?,?);', [username, realPasswd, email])
      ctx.body = {
        responseCode: 200,
        msg: 'suceess'
      }
    }
  } catch (error) {
    console.log('e', error);
    ctx.body = {
      responseCode: 500,
      msg: 'fail'
    }
  }
})

export default router