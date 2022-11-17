import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmployeeEntity } from '../employee/entities/employee.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity, EmployeeEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // console.log('JWT Scret', configService.get('JWT_SECRET'));
        // console.log('JWT SECRET', process.env.JWT_SECRET);
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
    /* JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }), */
  ],
  exports: [TypeOrmModule, AuthService, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
