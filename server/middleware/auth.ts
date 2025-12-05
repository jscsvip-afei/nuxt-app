/**
 * 1. 获取token，存入context( 上下文event.context.auth 其他接口可以使用 )
 * 2. 验证token合法性 如果有token的话,则处理token 之后再验证token的值
 */
import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  let token = getHeader(event, 'Authorization');
  console.log('auth token:', token);
  if (token) {
    // 去除 Bearer 前缀
    token = token.replace('Bearer ', '');
    const secret = "jianshu2024_secret";
    
    try {
      // 验证并解析 token
      const decoded = jwt.verify(token, secret);
      // 将用户信息存入 context，供后续接口使用
      console.log('decoded token:', decoded);
      event.context.auth = {uid:  (decoded as any).uid};
    } catch (error) {
      // token 无效或已过期
      event.context.auth = null;
    }
  } else {
    event.context.auth = null;
  }
})