import { Module } from '@nestjs/common';

import { EmployeeModule } from 'src/modules/employee/employee.module';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AssetsModule } from 'src/modules/assets/assets.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AssetsModule, AuthModule],
})
export class SeedModule {}
