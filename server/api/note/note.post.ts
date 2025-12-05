/**
 * 1. 判断用户是否登录
 * 2. 已登录创建文章
 * 文章的状态 1：未发布状态，2：已发布，3：更新发布
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
    notebookId: Joi.number().required(),
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

    // 创建文章
    const [insertRes] = await con.query(
      "INSERT INTO `notes` (`title`, `content_md`, `state`, `uid`) VALUES (?, ?, ?, ?)",
      [genTitle(), "", 1, uid]
    );
    console.log("insertRes", insertRes);

    if ((insertRes as any).affectedRows === 0) {
      return responseJson(1, "创建失败", {});
    }

    // 关联文集表
    const [relationRes] = await con.query(
      "INSERT INTO `notebook_notes` (`notebook_id`, `note_id`) VALUES (?, ?)",
      [body.notebookId, (insertRes as any).insertId]
    );
    console.log("relationRes", relationRes);

    if ((relationRes as any).affectedRows === 0) {
      return responseJson(1, "创建失败", {});
    }

    return responseJson(0, "创建文章成功", {
      noteId: (insertRes as any).insertId,
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