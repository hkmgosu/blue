import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Hostname = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return `${request.protocol}://${request.headers.host}`;
  },
);
