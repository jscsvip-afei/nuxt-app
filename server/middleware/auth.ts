export default defineEventHandler((event) => {
  const token = getHeader(event, 'Authorization')
  event.context.auth = { token }
})