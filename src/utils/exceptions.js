export  class HttpException extends Error {
  constructor(msg='服务器异常', responseCode=500) {
    super()
    this.responseCode = responseCode
    this.msg = msg
  }
}