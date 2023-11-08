import router from "./init.js";
import { decrypt,encrypt } from "../../utils/crypto.js";

router.post('/login', (ctx) => {
  const val = ctx.request.body.passwd
  const t = val.slice(-13)
  const cT = +new Date()
  if(cT - +t > 60000){
    ctx.body = {
      responseCode: 401,
      msg: 'fail'
    }
    return 
  }
  const passwd = val.split(t)[0]
  const privateKey = decrypt(passwd,t)
  const realPasswd = encrypt(privateKey)
  console.log('realPasswd',realPasswd);
  ctx.body = {
    responseCode: 200,
    msg: 'success'
  }
})

export default router