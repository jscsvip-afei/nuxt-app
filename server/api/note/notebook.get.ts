/**
 * 1. 判断用户是否登录
 * 2. 已登录获取文集列表
 *  *
 * 
 */


import Joi from "joi";
export default defineEventHandler(async (event) => {
  // 判断用户是否登录
  let uid = getLoginUid(event);
  if (!uid) {
    setResponseStatus(event, 401);
    return responseJson(1, "用户未登录", {});
  }

  let con;
  // 数据库操作
  try {     
    con = await getDB().getConnection();
    
    // 获取文集列表
    const [notebooks] = await con.query(
      "SELECT * FROM `notebooks` WHERE uid = ?",
      [uid]
    );
    console.log("notebooks", notebooks);
    return responseJson(0, "获取文集成功", {
      notebooks
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
