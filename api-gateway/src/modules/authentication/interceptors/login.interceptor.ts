import { catchError } from 'rxjs';
import { AxiosError } from 'axios';
import {
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoggerService } from '@nestjs/common/services/logger.service';
import { AxiosResponse } from 'axios';
import { ObservableInput } from 'rxjs';

export const loginCatchError = (logger: LoggerService) =>
  catchError<
    AxiosResponse<any, { email: string; password: string }>,
    ObservableInput<any>
  >((error: AxiosError) => {
    if (error.response) {
      logger.error(
        `External auth service error: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
      );
      if (error.response.status === 401) {
        throw new UnauthorizedException(
          'Invalid credentials from authentication service.',
        );
      }
      throw new InternalServerErrorException(
        'External authentication service responded with an error.',
      );
    } else if (error.request) {
      logger.error(`No response from authentication service: ${error.message}`);
      throw new InternalServerErrorException(
        'No response from authentication service. Please check network or service availability.',
      );
    } else {
      logger.error(`Error setting up authentication request: ${error.message}`);
      throw new InternalServerErrorException(
        'Failed to send authentication request.',
      );
    }
  });

