import router from "./init.js";

router.get('/song',(ctx)=>{
  console.log('ctx',ctx.request.query);
  ctx.body = {
    msg: '宋宋 你好呀！'
  }
})

export default router