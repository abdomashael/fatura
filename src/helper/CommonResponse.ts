import { StatusCodes } from 'http-status-codes';

export interface CommonResponse<T> {
  statusCode: StatusCodes;
  message?: string;
  data: T;
}
