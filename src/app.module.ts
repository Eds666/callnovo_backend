import { join } from 'path';

import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} from './config/constants';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { EmployeeModule } from './modules/employee/employee.module';
import { ClientModule } from './modules/client/client.module';
import { CampaingModule } from './modules/campaing/campaing.module';
import { RoleModule } from './modules/role/role.module';
import { EdocsModule } from './modules/edocs/edocs.module';
import { PermissionModule } from './modules/permission/permission.module';
import { AssetsModule } from './modules/assets/assets.module';
import { EmployeeContactsModule } from './modules/employee-contacts/employee-contacts.module';
import { EmployeeDependentsModule } from './modules/employee-dependents/employee-dependents.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    EmployeeModule,
    ClientModule,
    CampaingModule,
    RoleModule,
    EdocsModule,
    PermissionModule,
    AssetsModule,
    EmployeeContactsModule,
    EmployeeDependentsModule,
    CommonModule,
    SeedModule,
    FilesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
