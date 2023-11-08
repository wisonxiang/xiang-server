import mysql2 from 'mysql2'

function getDbConfig(){
  return{
      host:'10.211.55.10', //数据库地址
      port:3306,//端口
      user:'root', // 用户名
      password:'xiang525', // 密码
      database:'chat' //要连接的数据库
  }
}

const config = getDbConfig()
const sql = mysql2.createPool(config).promise()

export default sql