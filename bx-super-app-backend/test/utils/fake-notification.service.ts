import {
  AWSEmailRequest,
  AWSTemplatedEmailRequest,
  EmailRequest,
  INotificationService,
  SMSRequest,
} from '../../src/commons/interfaces';
export default class FakeNotificationService implements INotificationService {
  async SendAWSEmail(request: AWSEmailRequest): Promise<boolean> {
    if (!request) {
      return false;
    }
    return true;
  }
  async SendAWSTemplatedEmail(
    request: AWSTemplatedEmailRequest,
  ): Promise<boolean> {
    if (!request) {
      return false;
    }
    return true;
  }
  async SendEmail(request: EmailRequest): Promise<boolean> {
    if (!request) {
      return false;
    }
    return true;
  }
  async SendSMS(request: SMSRequest): Promise<boolean> {
    if (!request) {
      return false;
    }
    return true;
  }
}
