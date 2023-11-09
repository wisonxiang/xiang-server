import router from "./init.js";
import { decrypt, encrypt } from "@utils/crypto.js";
import sql from '@utils/db.js'
import { validateLogin, validateRegster } from '@utils/validations.js'

router.post('/login', (ctx) => {
  const params = ctx.request.body
  validateLogin(params)
  const t = params.passwd.slice(-13)
  const passwd = params.passwd.split(t)[0]
  const privateKey = decrypt(passwd, t)
  const realPasswd = encrypt(privateKey)
  console.log('realPasswd', realPasswd);
  ctx.success('登录成功')
})

router.post('/register', async (ctx) => {
  const params = ctx.request.body
  validateRegster(params)
  const t = params.passwd.slice(-13)
  const passwd = params.passwd.split(t)[0]
  const privateKey = decrypt(passwd, t)
  const realPasswd = encrypt(privateKey)
  const username = params.username
  const email = params.email || null
  try {
    const user = await sql.query('select * from user where username = ?;', [username])
    if (user[0].length) {
      ctx.fail('用户名已存在')
    } else {
      await sql.query('insert into user (username,password,email) values (?,?,?);', [username, realPasswd, email])
      ctx.success('注册成功')
    }
  } catch (error) {
    console.log('e', error);
    ctx.fail('数据库异常')
  }
})

export default router