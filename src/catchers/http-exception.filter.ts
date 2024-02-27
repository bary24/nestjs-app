import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('ERROR', exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    if (exception instanceof BadRequestException) {
      const response = exception.getResponse();
      console.log('RES', response);

      if (typeof response === 'object' && 'message' in response) {
        const errorMessages: Array<string> = response[
          'message'
        ] as Array<string>;
        // Customize your password error message here
        const customMessages = errorMessages.map((err) => {
          if (typeof err === 'string' && err.includes('password must match')) {
            return 'Password must be 6-16 characters long and include at least one number and one special character (!@#$%^&*).';
          }
          return err;
        });
        message = { ...response, message: customMessages };
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
