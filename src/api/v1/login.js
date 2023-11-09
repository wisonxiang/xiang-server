import router from "./init.js";
import sql from '@utils/db.js'
import { validateLogin, validateRegster } from '@utils/validations.js'

router.post('/login', (ctx) => {
  const params = ctx.request.body
  const { username, realPasswd } = validateLogin(params)
  console.log('realPasswd', realPasswd);
  ctx.success('登录成功')
})

router.post('/register', async (ctx) => {
  const params = ctx.request.body
  const { username, realPasswd, email } = validateRegster(params)
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