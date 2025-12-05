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