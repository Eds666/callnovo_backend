import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Headers,
  SetMetadata,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncomingHttpHeaders } from 'http';

import { AuthService } from './auth.service';
import * as request from 'supertest';
import { RawHeaders, GetUser, Auth } from './decorators';
import { RoleProtected } from './decorators/role-protected.decorator';

import { CreateUserDto, LoginUserDto } from './dto';
import { UserEntity } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('Register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('Login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    // console.log(paginationDto);
    return this.authService.findAll(paginationDto);
  }

  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(@GetUser() user: UserEntity) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: UserEntity,
    @GetUser('email') userEmail: string,

    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    console.log(request);

    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      userEmail,
      rawHeaders,
      headers,
    };
  }

  // @SetMetadata('roles', ['admin', 'super-user'])
  @Get('private2')
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: UserEntity) {
    return {
      ok: true,
      user,
    };
  }

  @Get('private3')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  privateRoute3(@GetUser() user: UserEntity) {
    return {
      ok: true,
      user,
    };
  }
}
