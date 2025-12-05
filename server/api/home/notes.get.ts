/**
 * 获取首页文章列表（公开接口，无需登录）
 * 支持分页查询
 */

export default defineEventHandler(async (event) => {
  // 获取查询参数
  const params = getQuery(event);
  const page = Number(params.page) || 1;
  const pageSize = Number(params.pageSize) || 10;

  let con;
  // 数据库操作
  try {
    con = await getDB().getConnection();

    // 获取已发布的文章列表（state=2 表示已发布）
    const [notesData] = await con.query(
      `SELECT notes.id AS id, notes.title, notes.content_md, notes.uid, users.nickname 
       FROM \`notes\` 
       LEFT JOIN \`users\` ON notes.uid = users.id 
       WHERE \`state\` = ? 
       LIMIT ? OFFSET ?`,
      [2, pageSize, (page - 1) * pageSize]
    );
    console.log("notesData", notesData);

    // 处理文章数据
    (notesData as any[]).forEach((v: any) => {
      v.subTitle = trimMarkdown(v.content_md, 300);
      v.cover = getFirstImage(v.content_md);
      v.like = 45;
      v.content_md = '';
      v.flag = false;
    });

    return responseJson(0, "获取文章成功", {
      list: notesData,
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
