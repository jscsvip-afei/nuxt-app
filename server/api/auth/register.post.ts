/**
 * 1. 获取数据
 * 2. 数据校验
 * 3. 密码加密
 * 4. 判断账号是否注册
 * 5. 创建账号
 */
import Joi from 'joi';
import md5 from 'md5'
export default defineEventHandler(async (event) => {
  // 获取数据
  const body = await readBody(event);
  console.log('body', body);
  // 校验joi数据
  
  const schema = Joi.object({
    nickname: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().pattern(/^1[3-9]\d{9}$/),
  })
  try {
      const value = await schema.validateAsync(body);
  }
  catch (err) { 
    return {
      code:1,
      msg: '数据格式错误',
      data:{}
    }
  }

  
  // md5密码加密
  let salt = 'jianshu2024_'
  const password = md5(md5(body.password) + salt);

  // 查询数据库
  try {
  } catch (error) {
    return {
      code:1,
      msg: '服务器错误',
      data:{}
    }}
     
  const [row] = await getDB().query('SELECT id FROM `users` WHERE phone = ?', [body.phone]);
  console.log('row', row);
  // 判断账号是否注册
  if((row as any).length > 0) {
    return {
      code:1,
      msg: '该手机号已注册',
      data:{}
    }
  }else{
    // 创建账号
    const [insertRes] = await getDB().query('INSERT INTO `users` (nickname, password, phone) VALUES (?, ?, ?)', [body.nickname, password, body.phone]);
    console.log('insertRes', insertRes);
    return {
      code:0,
      msg: '注册成功',
      data:{
        id: (insertRes as any).insertId,
        nickname: body.nickname,
        phone: body.phone
      }
    }
  } 
})