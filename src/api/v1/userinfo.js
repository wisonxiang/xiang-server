import router from "./init.js";
import sql from '@utils/db.js'

router.get('/userinfo',async (ctx)=>{
  const res = await sql.query('select uid,username,email from user where uid = ?', [ctx.uid]);
  const userinfo  = res[0][0]
  ctx.success('success', 0, userinfo)
})

export default router