import router from "./init.js";

router.post('/xiang',(ctx)=>{
  console.log('ctx',ctx.request.body);
  ctx.body = {
    msg: '向向2 你好呀！'
  }
})

export default router