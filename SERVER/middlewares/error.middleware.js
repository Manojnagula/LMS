// const errorMiddleware = (error, req, res, next) => {
//   res.statusCode = res.statusCode || 500;
//   res.message = res.message || "something went wrong";

//   return res.status(res.statusCode).json({
//     success: false,
//     message: res.message,
//     stack: error.stack,
//   });
// };

// export default errorMiddleware;


const errorMiddleware = (error, req, res, next) => {
  req.statusCode  = req.statusCode || 500;
  req.message = req.message || "Something went wrong";

  return res.status(req.statusCode).json({
      success: false,
      message: req.message,
      stack: error.stack
  });
}

export default errorMiddleware;