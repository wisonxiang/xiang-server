import log4js from 'log4js'
import path from 'path'

const basePath = path.resolve('./logs')


log4js.configure({
  replaceConsole: true,
  appenders: {
    out: { type: 'stdout' },
    // dev: {
    //   type: 'file',
    //   filename: './src/log4js/test.log'
    // },
    info: {
      category: 'infoLog',
      type: 'dateFile',
      filename: basePath+'/info.log',
      pattern: "-yyyy-MM-dd-hh",
      keepFileExt: true,
      alwaysIncludePattern: true,
    },
    error: {
      category: 'errorLog',
      type: 'dateFile',
      filename: basePath+'/error.log',
      pattern: "-yyyy-MM-dd-hh",
      keepFileExt: true,
      alwaysIncludePattern: true,
    }
  },
  categories: {
    default: { appenders: ["out"], level: "debug" },
    dev: { appenders: ["info"], level: "info" },
    pro: { appenders: ["error"], level: "warn" },
  }
})

export const log = log4js.getLogger()
export const devLog = log4js.getLogger('dev')
export const proLog = log4js.getLogger('pro')


// logger.trace('this is trace')
// logger.debug('Time:', new Date())
// logger.info('this is info')
// logger.warn('this is warn')
// logger.error('this is error')
// logger.fatal('this is fatal')
// logger.mark('this is mark')