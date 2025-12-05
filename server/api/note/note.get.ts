/**
 * 1. 判断用户是否登录
 * 2. 已登录获取单篇文章详情
 */

import Joi from "joi";

export default defineEventHandler(async (event) => {
  // 判断用户是否登录
  let uid = getLoginUid(event);
  if (!uid) {
    setResponseStatus(event, 401);
    return responseJson(1, "用户未登录", {});
  }

  // 获取查询参数
  const params = getQuery(event);
  console.log("params", params);

  // 校验joi数据
  const schema = Joi.object({
    noteId: Joi.number().required(),
  });
  try {
    await schema.validateAsync(params);
  } catch (err) {
    return responseJson(1, "参数错误", {});
  }

  let con;
  // 数据库操作
  try {
    con = await getDB().getConnection();

    // 获取文章详情
    const [rows] = await con.query(
      "SELECT * FROM `notes` WHERE `uid` = ? AND `id` = ?",
      [uid, params.noteId]
    );
    console.log("rows", rows);

    if ((rows as any).length === 0) {
      return responseJson(1, "文章不存在", {});
    }

    const note = (rows as any)[0];
    return responseJson(0, "获取文章成功", {
      note: {
        id: note.id,
        title: note.title,
        content_md: note.content_md,
        state: note.state,
      },
    });
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
