import router from "./init.js";

router.get('/song',(ctx)=>{
  ctx.body = {
    msg: '宋宋2 你好呀！'
  }
})

export default router