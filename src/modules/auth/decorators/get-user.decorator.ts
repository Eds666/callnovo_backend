import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    // console.log({ data });
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user)
      throw new InternalServerErrorException('User no encontrado (request)');

    return !data ? user : user[data]; // esto es un ternario
    // si no existe data devuelve user y si existe devuelve los 2
  },
);
