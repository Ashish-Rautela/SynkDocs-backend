const { HTTP_STATUS } = require('../constants');

class ApiResponse {
  static success(data = null, message = 'Success', statusCode = HTTP_STATUS.OK) {
    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        success: true,
        message,
        data
      })
    };
  }

  static error(message = 'An error occurred', code = 'INTERNAL_ERROR', statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, data = null) {
    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        success: false,
        message,
        code,
        data
      })
    };
  }
}

module.exports = ApiResponse;
