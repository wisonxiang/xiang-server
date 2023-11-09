import Koa from 'koa'
import koaBody from 'koa-body'
import { initCore } from './core/init'
import path from 'path'
import koaStatic from 'koa-static'
import catchError from './middlewares/catchError'
import routerResponse from './middlewares/routerResponse'
import localFilter from './middlewares/localFilter'

const app = new Koa()
app.use(catchError)
app.use(routerResponse())
app.use(localFilter)

// 静态资源
app.use(koaStatic(path.resolve("./static"), { extensions: ["html"] }))

// api路由 socket服务
app.use(koaBody())
const httpServer = initCore(app)

// 是httpServer不是app
httpServer.listen(3000, () => { })