import { proLog } from '@/utils/log.js';

export default async function catchError(ctx, next) {
  try {
    await next();
  } catch (error) {
    proLog.error('全局异常', error);
    ctx.fail(error.msg || '服务器异常');
  }
}
