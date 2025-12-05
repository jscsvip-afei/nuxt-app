/**
 * 1. 判断用户是否登录
 * 2. 已登录删除文章
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
    noteId: Joi.number().required(),
  });
  try {
    await schema.validateAsync(body);
  } catch (err) {
    return responseJson(1, "参数错误", {});
  }

  let con;
  // 数据库操作
  try {
    con = await getDB().getConnection();

    // 删除文章
    const [deleteRes] = await con.query(
      "DELETE FROM `notes` WHERE `id` = ? AND `uid` = ?",
      [body.noteId, uid]
    );
    console.log("deleteRes", deleteRes);

    if ((deleteRes as any).affectedRows === 0) {
      return responseJson(1, "删除失败", {});
    }

    // 删除文集关联
    await con.query(
      "DELETE FROM `notebook_notes` WHERE `note_id` = ?",
      [body.noteId]
    );

    return responseJson(0, "删除文章成功", {});
  } catch (error) {
    console.error("数据库错误:", error);
    setResponseStatus(event, 500);
    return responseJson(1, "服务器错误", {});
  } finally {
    if (con) {
      con.release();
    }
  }
});
