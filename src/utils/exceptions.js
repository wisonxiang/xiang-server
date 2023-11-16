export  class HttpException extends Error {
  constructor(msg='服务器异常', code=500) {
    super()
    this.code = code
    this.msg = msg
  }
}