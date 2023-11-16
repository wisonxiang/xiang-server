import router from "./init.js";

router.get('/userinfo',(ctx)=>{
  ctx.success('success', 0, ctx.userinfo)
})

export default router