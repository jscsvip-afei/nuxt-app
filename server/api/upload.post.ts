import path from "path";
import * as fs from "fs";

export default defineEventHandler(async (event) => {
  // 判断用户是否登录
  let uid = getLoginUid(event);
  if (!uid) {
    setResponseStatus(event, 401);
    return responseJson(1, "用户未登录", {});
  }

  // 获取数据
  const body = await readMultipartFormData(event);
  // console.log("body", body);

  if (!body || body.length === 0) {
    return responseJson(1, "请上传头像~", {});
  }

  const file = body[0];

  // 校验文件类型
  if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
    return responseJson(1, '请上传jpg/png/jpeg类型的图片', {});
  }

  // 图片名称
  const fileName = Date.now() + '-' + file.filename;
  // 图片路径
  const filePath = path.join(process.cwd(), 'public', 'img', fileName);

  // 写入文件
  try {
    await fs.promises.writeFile(filePath, file.data);
  } catch (err) {
    console.error("文件写入错误:", err);
    return responseJson(1, "上传图片失败", {});
  }

  // 存储图片路径
  const avatarUrl = '/img/' + fileName;

  let con;
  // 数据库操作
  try {
    con = await getDB().getConnection();

    // 更新用户头像
    const [updateRes] = await con.query(
      "UPDATE `users` SET `avatar`=? WHERE `id`=?",
      [avatarUrl, uid]
    );

    if ((updateRes as any).affectedRows === 0) {
      return responseJson(1, "上传头像失败~", {});
    }

    return responseJson(0, "ok~", {
      avatar: avatarUrl,
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
