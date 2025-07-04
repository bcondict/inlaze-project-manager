import { catchError } from 'rxjs';
import { AxiosError } from 'axios';
import {
  ConflictException,
  InternalServerErrorException,
  LoggerService,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ObservableInput } from 'rxjs';
import { AxiosResponse } from 'axios';

export const registerCatchError = (logger: LoggerService) =>
  catchError<AxiosResponse<any, any>, ObservableInput<any>>(
    (error: AxiosError) => {
      if (error.response) {
        logger.error(
          `Auth service error during registration: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        if (error.response.status === HttpStatus.CONFLICT) {
          throw new ConflictException(
            // @ts-expect-error error reader
            error.response.data['message'] ||
              'A user with this email already exists.',
          );
        }
        if (error.response.status >= 400 && error.response.status < 500) {
          throw new HttpException(
            // @ts-expect-error error reader
            error.response.data['message'] || 'Registration request error.',
            error.response.status,
          );
        }
        throw new InternalServerErrorException(
          'Auth service error during registration.',
        );
      } else if (error.request) {
        logger.error(
          `No response from auth service during registration: ${error.message}`,
        );
        throw new InternalServerErrorException(
          'No response from auth service. Please check network or service availability.',
        );
      } else {
        logger.error(`Error setting up registration request: ${error.message}`);
        throw new InternalServerErrorException(
          'Failed to send registration request.',
        );
      }
    },
  );
