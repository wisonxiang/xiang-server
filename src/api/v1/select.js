import router from "./init.js";
import mysql2 from 'mysql2'

function getDbConfig(){
  return{
      host:'10.211.55.10', //数据库地址
      port:3306,//端口
      user:'root', // 用户名
      password:'xiang525', // 密码
      database:'test' //要连接的数据库
  }
}

router.get('/select',async (ctx)=>{
  const config = getDbConfig()
  const promisePool = mysql2.createPool(config).promise()
  const user = await promisePool.query('select * from students where id = 1;')
  ctx.body = {
    msg: user[0]
  }
})

router.get('/create',async (ctx)=>{
  const query = ctx.request.query
  const name = query.name
  const sex = query.sex
  const age = Number(query.age)

  if(name&&sex&&age){
    const config = getDbConfig()
    const promisePool = mysql2.createPool(config).promise()
    const user = await promisePool.query(`insert into students (name,sex,age) values ('${name}','${sex}',${age});`)
    ctx.body = {
      suceess: true,
      msg: user[0]
    }
  }else{
    ctx.body = {
      suceess: false,
      msg: 'error'
    }
  }
})

router.get('/del',async (ctx)=>{
  const config = getDbConfig()
  const promisePool = mysql2.createPool(config).promise()
  const user = await promisePool.query(`delete from students where id >= 3;`)
  ctx.body = {
    suceess: true,
  }
})

router.get('/update',async (ctx)=>{
  const config = getDbConfig()
  const promisePool = mysql2.createPool(config).promise()
  const user = await promisePool.query('update students set age=? where id = 2;',[10])
  ctx.body = {
    suceess: true,
  }
})

export default router