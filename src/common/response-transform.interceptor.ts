import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Assume the data structure for paginated responses is { data: [], page: number, limit: number, totalCount: number }
        if (
          data.data &&
          data.page !== undefined &&
          data.limit !== undefined &&
          data.totalCount !== undefined
        ) {
          // This is a paginated response, so we wrap it accordingly
          return {
            success: true,
            payload: data.data,
            pageInfo: {
              currentPage: data.page,
              itemsPerPage: data.limit,
              totalItems: data.totalCount,
              totalPages: Math.ceil(data.totalCount / data.limit),
            },
          };
        } else {
          // This is a non-paginated response, so we wrap it without page info
          return {
            success: true,
            payload: data,
          };
        }
      }),
    );
  }
}
