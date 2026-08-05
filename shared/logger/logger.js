const logLevel = process.env.LOG_LEVEL || 'info';

class Logger {
  constructor(contextName = 'LambdaContext') {
    this.contextName = contextName;
  }

  formatMessage(level, message, meta = {}) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      context: this.contextName,
      message,
      meta
    });
  }

  info(message, meta = {}) {
    console.log(this.formatMessage('info', message, meta));
  }

  warn(message, meta = {}) {
    console.warn(this.formatMessage('warn', message, meta));
  }

  error(message, meta = {}) {
    console.error(this.formatMessage('error', message, meta));
  }

  debug(message, meta = {}) {
    if (logLevel === 'debug') {
      console.debug(this.formatMessage('debug', message, meta));
    }
  }

  logRequest(event) {
    const sanitizeEvent = {
      path: event.path || event.rawPath,
      httpMethod: event.httpMethod || event.requestContext?.http?.method,
      queryStringParameters: event.queryStringParameters,
      pathParameters: event.pathParameters,
      headers: {
        host: event.headers?.host,
        'user-agent': event.headers?.['user-agent']
      },
      requestContext: {
        requestId: event.requestContext?.requestId,
        connectionId: event.requestContext?.connectionId,
        routeKey: event.requestContext?.routeKey,
        identity: event.requestContext?.identity
      }
    };
    this.info('Incoming Request', { event: sanitizeEvent });
  }

  logResponse(response) {
    this.info('Outgoing Response', {
      statusCode: response.statusCode,
      headers: response.headers
    });
  }

  logError(error) {
    this.error('Execution Error', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode || 500,
      code: error.code || 'INTERNAL_ERROR'
    });
  }
}

module.exports = Logger;
