import { HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EmailRequest,
  INotificationService,
  SMSRequest,
  AWSEmailRequest,
  AWSTemplatedEmailRequest,
} from '../commons/interfaces';
import LoggerService from './logger.service';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {}
  async SendSMS(request: SMSRequest): Promise<boolean> {
    try {
      const result = await this.http
        .post(`${this.config.get('NOTIFICATION_API')}/sms/send`, {
          payload: {
            ...request,
            sender: {
              email: this.config.get('EMAIL_FROM'),
            },
          },
        })
        .toPromise();
      if (result.status == HttpStatus.OK) {
        return true;
      }
      return false;
    } catch (e) {
      this.logger.error(e.message, e.stack, NotificationService.name);
      return false;
    }
  }
  async SendEmail(request: EmailRequest): Promise<boolean> {
    try {
      const result = await this.http
        .post(`${this.config.get('NOTIFICATION_API')}/email/send`, {
          payload: {
            ...request,
            sender: {
              email: this.config.get('EMAIL_FROM'),
            },
          },
        })
        .toPromise();
      if (result.status == HttpStatus.CREATED) {
        return true;
      }
      return false;
    } catch (e) {
      this.logger.error(e.message, e.stack, NotificationService.name);
      return false;
    }
  }

  async SendAWSEmail(request: AWSEmailRequest): Promise<boolean> {
    try {
      const result = await this.http
        .post(`${this.config.get('NOTIFICATION_API')}/email/aws/send`, {
          payload: request,
        })
        .toPromise();
      if (result.status === HttpStatus.OK) {
        return true;
      }
    } catch (err) {
      this.logger.error(err.message, err.stack, NotificationService.name);
      return false;
    }
  }

  async SendAWSTemplatedEmail(
    request: AWSTemplatedEmailRequest,
  ): Promise<boolean> {
    try {
      const result = await this.http
        .post(
          `${this.config.get('NOTIFICATION_API')}/email/aws/send-templated`,
          {
            payload: request,
          },
        )
        .toPromise();
      if (result.status === HttpStatus.OK) {
        return true;
      }
    } catch (err) {
      this.logger.error(err.message, err.stack, NotificationService.name);
      return false;
    }
  }
}
