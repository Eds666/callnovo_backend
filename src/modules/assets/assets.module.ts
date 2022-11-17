import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { EmployeeEntity } from '../employee/entities/employee.entity';
import { EmployeeModule } from '../employee/employee.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asset, EmployeeEntity]),
    EmployeeModule,
    AuthModule,
  ],
  controllers: [AssetsController],
  providers: [AssetsService],
  exports: [AssetsService, TypeOrmModule],
})
export class AssetsModule {}
