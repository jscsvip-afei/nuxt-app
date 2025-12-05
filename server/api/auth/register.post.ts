/**
 * 1. 获取数据
 * 2. 数据校验
 * 3. 密码加密
 * 4. 判断账号是否注册
 * 5. 创建账号
 */
import Joi from "joi";
import md5 from "md5";
import { responseJson } from "~~/server/utils/helper";
export default defineEventHandler(async (event) => {
  // 获取数据
  const body = await readBody(event);
  console.log("body", body);
  // 校验joi数据

  const schema = Joi.object({
    nickname: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().pattern(/^1[3-9]\d{9}$/),
  });
  try {
    const value = await schema.validateAsync(body);
  } catch (err) {
    return responseJson(1, "数据格式错误", {});
  }

  // md5密码加密
  let salt = "jianshu2024_";
  const password = md5(md5(body.password) + salt);
  
  let con;
  // 数据库操作
  try {
    con = await getDB().getConnection();
    
    // 查询数据库
    const [row] = await con.query(
      "SELECT id FROM `users` WHERE phone = ?",
      [body.phone]
    );
    console.log("row", row);
    // 判断账号是否注册
    if ((row as any).length > 0) {
      return responseJson(1, "该手机号已注册", {});
    }
    
    // 创建账号
    const [insertRes] = await con.query(
      "INSERT INTO `users` (nickname, password, phone) VALUES (?, ?, ?)",
      [body.nickname, password, body.phone]
    );
    console.log("insertRes", insertRes);
    
    if ((insertRes as any).affectedRows === 1) {
      return responseJson(0, "注册成功", {
        id: (insertRes as any).insertId,
        nickname: body.nickname,
        phone: body.phone,
      });
    }
  } catch (error) {
    console.error("数据库错误:", error);
    setResponseStatus(event, 500);
    return responseJson(1, "服务器错误", {});
  } finally {
    // 确保连接被释放
    if (con) {
      con.release();
    }
  }
});
