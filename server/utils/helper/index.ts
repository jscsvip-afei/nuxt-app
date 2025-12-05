// Utility function to format JSON responses
export const responseJson = (code: number, msg: string, data: any) => {
  return {
    code,
    msg,
    data
  }
}

export const getLoginUid = (event: any): number | null => {
  // @ts-ignore
  return event.context?.auth?.uid || null;
}

// 生成默认文章标题
export const genTitle = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  return `无标题文章_${year}${month}${day}${hour}${minute}`;
}

// 去除markdown格式，截取指定长度的纯文本
export const trimMarkdown = (markdown: string, length: number): string => {
  if (!markdown) return '';
  // 去除markdown标记
  const text = markdown
    .replace(/!\[.*?\]\(.*?\)/g, '')  // 图片
    .replace(/\[.*?\]\(.*?\)/g, '')   // 链接
    .replace(/#{1,6}\s?/g, '')        // 标题
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // 粗体
    .replace(/(\*|_)(.*?)\1/g, '$2')  // 斜体
    .replace(/`{1,3}[^`]*`{1,3}/g, '') // 代码
    .replace(/>\s?/g, '')             // 引用
    .replace(/[-*+]\s/g, '')          // 列表
    .replace(/\n/g, ' ')              // 换行
    .trim();
  return text.length > length ? text.substring(0, length) + '...' : text;
}

// 获取markdown中的第一张图片
export const getFirstImage = (markdown: string): string => {
  if (!markdown) return '';
  const match = markdown.match(/!\[.*?\]\((.*?)\)/);
  return match ? match[1] : '';
} 