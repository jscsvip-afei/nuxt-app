/**
 * 获取所有文集列表（公开接口，无需登录）
 */

export default defineEventHandler(async (event) => {
  let con;
  // 数据库操作
  try {     
    con = await getDB().getConnection();
    
    // 获取所有文集列表
    const [notebooks] = await con.query(
      "SELECT * FROM `notebooks`"
    );
    console.log("notebooks", notebooks);
    return responseJson(0, "获取所有文集成功", {
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
