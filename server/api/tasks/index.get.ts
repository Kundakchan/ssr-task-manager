export default defineEventHandler((event) => {
  console.log(event)
  return { message: 'list' }
})