import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
  Inject,
} from '@nestjs/common';
import { AUTHENTICATION_SERVICE, IAuthenticationService } from '../interfaces';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private authenticationService: IAuthenticationService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers?.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException(
        'Authorization: Bearer <token> header missing',
      );
    }

    const authorizationHeaderDivided = authorizationHeader.split(' ');
    if (
      authorizationHeaderDivided.length !== 2 ||
      authorizationHeaderDivided[0] !== 'Bearer'
    ) {
      throw new UnauthorizedException(
        'Authorization: Bearer <token> header invalid',
      );
    }
    const token = authorizationHeaderDivided[1];

    try {
      const userInfoResult = await this.authenticationService.UserInfo(token);
      if (!userInfoResult.isSuccess) {
        throw new UnauthorizedException();
      }
      request['user'] = userInfoResult.data;
    } catch (e) {
      throw new UnauthorizedException('Invalid Token');
    }
    return true;
  }
}
