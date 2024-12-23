export class CreateResetPasswordDTO {
  readonly userId: string;
  readonly username: string;
  readonly token: string;
  readonly nonce: string;
  readonly date: string;
}
