class ApiResponse {
  static success(res, message, data = null, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }
  static error(res, message = "Internal Server Error", statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  static notFound(res, message = "Not Found", statusCode = 404) {
    return res.status(statusCode).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  static badRequest(res, message = "Bad Request", statusCode = 400) {
    return res.status(statusCode).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  static unauthorized(res, message = "Unauthorized", statusCode = 401) {
    return res.status(statusCode).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  static forbidden(res, message = "Forbidden", statusCode = 403) {
    return res.status(statusCode).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}

export default ApiResponse;
