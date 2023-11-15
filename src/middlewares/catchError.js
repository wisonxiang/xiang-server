export default async function catchError(ctx,next){
  try {
    await next()
  } catch (error) {
    console.log('e',error);
    ctx.body = {
      code: error.code || 500,
      msg: error.msg || '服务器异常'
    }
  }
}