/**
 * 1.获取客户端传来的手机号和密码
 * 2.校验数据格式
 * 3.查询数据库，如果手机号不存在就返回账号不存在, 密码加密, 判断账号密码是否正确
 * 4.如果已经注册并且密码正确，生成token，token根据jwt生成
 * 5.返回token
 */
import Joi from "joi";
import md5 from "md5";
import { responseJson } from "~~/server/utils/helper";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  // 获取数据
  const body = await readBody(event);
  console.log("body", body);
  // 校验joi数据

  const schema = Joi.object({
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
      "SELECT * FROM `users` WHERE phone = ? AND password = ?",
      [body.phone, password]
    );
    console.log("row", row);
    // 判断账号是否注册
    if ((row as any).length === 0) {
      return responseJson(1, "该手机号未注册或密码错误", {});
    }
    
    // 生成token
    let secret = "jianshu2024_secret";
    const token = jwt.sign(
      {
        uid: (row as any)[0].id,
        phone: body.phone,
      },
      secret,
      { expiresIn: "7d" }
    );

    return responseJson(0, "登录成功", { 
      accessToken:token,
      userInfo:{
        nickname: (row as any)[0].nickname,
        phone: (row as any)[0].phone,
      } 
    });
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
