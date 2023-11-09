import router from "./init.js";
import sql from '@utils/db.js'
import { validateLogin, validateRegster } from '@utils/validations.js'

router.post('/login', async (ctx) => {
  const params = ctx.request.body
  const { username, realPasswd } = validateLogin(params)
  const res = await sql.query('select uid,username,password,email from user where username = ?', [username]);
  if(res[0].length){
    const user = res[0][0]
    if(user.password === realPasswd){
      const obj = {username:user.username,uid:user.uid,email:user.email}
      ctx.success('登录成功',0,obj)
    }else{
      ctx.fail('密码错误')
    }
  }else{
    ctx.fail('用户不存在')
  }
})

router.post('/register', async (ctx) => {
  const params = ctx.request.body
  const { username, realPasswd, email } = validateRegster(params)
  try {
    const user = await sql.query('select count(*) from user where username = ?;', [username])
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