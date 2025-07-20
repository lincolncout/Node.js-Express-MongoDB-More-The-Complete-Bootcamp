class AppError extends Error {
  constructor(message, statusCode) {
    console.log(message);
    super(message); // Cria um erro com a mensagem (super -> parent)

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
