import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

interface NotificationRequest {
  commentId: string;
  ownerId: string;
  ownerName: string;
  content: string;
}

import { plainToInstance } from 'class-transformer';
import { validateOrReject, IsBoolean } from 'class-validator';
import { UserResponseScheme } from '../authentication/schemes/user-response.scheme';
import { CommentScheme } from '../manager/schemes/comment.scheme';

class NotificationResponseScheme {
  @IsBoolean({ message: 'Processed must be a boolean value.' })
  processed: boolean;
}

@Injectable()
export class NotifierService {
  private readonly logger: Logger = new Logger(NotifierService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private get domain(): string {
    const notifierUrl = this.configService.get<string>('microservices.taskNotifier');
    if (!notifierUrl) {
      this.logger.error('Task Notifier service URL is not configured.');
      throw new InternalServerErrorException(
        'Notification microservice URL is not configured.',
      );
    }
    return notifierUrl;
  }

  async newComment(
    clientId: string,
    ownerComment: UserResponseScheme,
    comment: CommentScheme,
  ): Promise<NotificationResponseScheme> {
    const notificationRequest: NotificationRequest = {
      commentId: comment.id,
      ownerId: ownerComment.id,
      ownerName: ownerComment.firstName + ' ' + ownerComment.lastName,
      content: comment.content,
    };

    try {
      const response = await firstValueFrom<
        AxiosResponse<NotificationResponseScheme>
      >(
        this.httpService.post<NotificationResponseScheme>(
          `${this.domain}/api/v1/notify/${clientId}/new-comment`,
          notificationRequest,
        ),
      );
      const notificationResponse = plainToInstance(
        NotificationResponseScheme,
        response.data,
      );

      await validateOrReject(notificationResponse).catch((errors) => {
        this.logger.error(
          `Invalid notification response schema from microservice for userId ${clientId}: ${JSON.stringify(errors)}`,
        );
        throw new InternalServerErrorException(
          'Invalid notification response format received.',
        );
      });

      this.logger.log(
        `Notification of type 'new-comment' sent successfully to user '${clientId}'.`,
      );

      return notificationResponse;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(
        `Unexpected error sending notification for userId ${clientId}: ${error}`,
      );
      throw new InternalServerErrorException(
        'An unexpected error occurred while processing the notification.',
      );
    }
  }
}
