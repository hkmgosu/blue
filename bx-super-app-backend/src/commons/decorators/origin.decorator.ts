import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Origin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return `${request.headers.origin}`;
  },
);
