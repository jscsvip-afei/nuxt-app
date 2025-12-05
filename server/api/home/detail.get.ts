/**
 * 获取文章详情（公开接口，无需登录）
 */

import Joi from "joi";

export default defineEventHandler(async (event) => {
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

    // 获取文章详情（state=2 表示已发布）
    const [notesData] = await con.query(
      `SELECT notes.id AS id, notes.title, notes.content_md, notes.uid, notes.created_at, 
              users.nickname, users.avatar 
       FROM \`notes\` 
       LEFT JOIN \`users\` ON notes.uid = users.id 
       WHERE \`state\` = ? AND notes.id = ?`,
      [2, params.noteId]
    );
    console.log("notesData", notesData);

    if ((notesData as any[]).length !== 1) {
      return responseJson(1, "文章不存在", {});
    }

    const note = (notesData as any)[0];
    return responseJson(0, "获取文章成功", {
      id: note.id,
      title: note.title,
      subTitle: trimMarkdown(note.content_md, 300),
      author: {
        id: note.uid,
        nickname: note.nickname,
        avatar: note.avatar,
      },
      content_md: note.content_md,
      created_at: note.created_at,
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
