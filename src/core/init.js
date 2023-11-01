import Router from 'koa-router'
import { createServer } from 'http'
import initSocket from '../socket'
const requireDirectory = require('require-directory')

const apiDirectory = `${process.cwd()}/src/api` // 拼接绝对路径

function initCore(app){
  function whenLoadModule(obj) {
    const router = obj.default 
    if (router instanceof Router && router.stack.length) {
        app.use(obj.default.routes())
    }
  }
  requireDirectory(module, apiDirectory, {
    visit: whenLoadModule
  })
  // socket服务
  const httpServer = createServer(app.callback());
  initSocket(httpServer)
  return httpServer
}

export { initCore }
