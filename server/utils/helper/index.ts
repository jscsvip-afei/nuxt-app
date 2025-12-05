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