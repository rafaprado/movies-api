class AppError {
  status;
  message;

  constructor(message, statusCode = 400) {
    this.status = statusCode;
    this.message = message;
  }
}

module.exports = AppError;