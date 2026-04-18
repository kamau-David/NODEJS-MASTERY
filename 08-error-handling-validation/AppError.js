// A custom error class lets you distinguish "expected" errors (bad input,
// not found, unauthorized) from actual bugs (undefined is not a function).
// This distinction matters: operational errors get a clean message to the
// client; unexpected bugs should be logged loudly and never leak details.
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // marks this as an expected, handled error
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
