/**
 * 1. 判断用户是否登录
 * 2. 已登录删除文集
 */

import Joi from "joi";
export default defineEventHandler(async (event) => {
  // 判断用户是否登录
  let uid = getLoginUid(event);
  if (!uid) {
    setResponseStatus(event, 401);
    return responseJson(1, "用户未登录", {});
  }
  // 获取数据
  const body = await readBody(event);   
  console.log("body", body);
  // 校验joi数据
  
  const schema = Joi.object({
    id: Joi.number().required(),
  });
  try {
    const value = await schema.validateAsync(body);
  } catch (err) {
    return responseJson(1, "数据格式错误", {});
  }

  let con;
  // 数据库操作
  try {     
    con = await getDB().getConnection();
    
    // 删除文集
    const [deleteRes] = await con.query(
      "DELETE FROM `notebooks` WHERE id = ? AND uid = ?",
      [body.id, uid]
    );
    console.log("deleteRes", deleteRes);
    
    if ((deleteRes as any).affectedRows === 1) {
      return responseJson(0, "删除文集成功", {});
    } else {
      return responseJson(1, "文集不存在或无权限删除", {});
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
