/**
 * 1. 判断用户是否登录
 * 2. 已登录获取用户文集下的所有文章列表
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
    notebookId: Joi.number().required(),
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

    // 查询文章和文集的关联表
    const [notebookRows] = await con.query(
      "SELECT `note_id` FROM `notebook_notes` WHERE `notebook_id` = ?",
      [params.notebookId]
    );
    console.log("notebookRows", notebookRows);

    if ((notebookRows as any).length === 0) {
      return responseJson(0, "无数据", { list: [] });
    }

    // 遍历获取文章id列表
    const noteIdList = (notebookRows as any).map((v: any) => v.note_id);

    // 查询文章表
    const [notesRows] = await con.query(
      "SELECT id, title FROM `notes` WHERE `uid` = ? AND id IN (?) ORDER BY `id` DESC",
      [uid, noteIdList]
    );
    console.log("notesRows", notesRows);

    return responseJson(0, "获取文章列表成功", {
      list: notesRows,
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
