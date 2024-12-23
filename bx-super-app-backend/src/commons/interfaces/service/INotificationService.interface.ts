export type EmailAddress = {
  name?: string;
  email: string;
};

export type EmailRequest = {
  to: Array<EmailAddress>;
  htmlContent?: string;
  subject?: string;
  params?: any;
  templateId?: string;
};

export type SMSRequest = {
  username: string;
  password: string;
  sendTo: string;
  message: string;
};

export type AWSEmailRequest = {
  sender: EmailAddress;
  subject: string;
  htmlContent: string;
  textContent: string;
  to: Array<EmailAddress>;
};

export type AWSTemplatedEmailRequest = {
  sender: string;
  template: string;
  to: string;
  templateData?: string;
};

export type AWSResponse = {
  message?: string;
  status?: string;
  data?: any;
};

export const NOTIFICATION_SERVICE = 'NOTIFICATION_SERVICE';

export interface INotificationService {
  SendEmail(request: EmailRequest): Promise<boolean>;
  SendSMS(request: SMSRequest): Promise<boolean>;
  SendAWSEmail(request: AWSEmailRequest): Promise<boolean>;
  SendAWSTemplatedEmail(request: AWSTemplatedEmailRequest): Promise<boolean>;
}
