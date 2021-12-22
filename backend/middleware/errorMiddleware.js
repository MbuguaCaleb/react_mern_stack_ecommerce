//Middleware handling any URL that  is Not Found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  if (res.status(404)) {
    next(error)
  }
}

const errorHandler = (err, req, res, next) => {
  const error = res.statusCode === 200 ? 500 : res.statusCode
  res.status(error)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}
//Anywhere i dont say export default makes my export a named export
export { notFound, errorHandler }
