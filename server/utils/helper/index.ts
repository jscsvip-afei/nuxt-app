// Utility function to format JSON responses
export const responseJson = (code: number, msg: string, data: any) => {
  return {
    code,
    msg,
    data
  }
}