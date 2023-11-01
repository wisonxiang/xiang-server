import router from "./init.js";

router.get('/xiang',(ctx)=>{
  ctx.body = {
    msg: '向向 你好呀！ hello 666'
  }
})

export default router