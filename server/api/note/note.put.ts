/**
 * 1. 判断用户是否登录
 * 2. 已登录修改文章
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
    title: Joi.string().allow(""),
    content_md: Joi.string().allow(""),
    state: Joi.number().required(),
  });
  try {
    await schema.validateAsync(body);
  } catch (err) {
    console.log("参数错误", err);
    return responseJson(1, "参数错误", {});
  }

  let con;
  // 数据库操作
  try {
    con = await getDB().getConnection();

    // 修改文章
    const [updateRes] = await con.query(
      "UPDATE `notes` SET `title` = ?, `content_md` = ?, `state` = ? WHERE `id` = ? AND `uid` = ?",
      [body.title, body.content_md, body.state, body.noteId, uid]
    );
    console.log("updateRes", updateRes);

    if ((updateRes as any).affectedRows === 0) {
      return responseJson(1, "修改失败", {});
    }

    return responseJson(0, "修改文章成功", {});
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
