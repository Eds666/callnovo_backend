import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';

import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeEntity } from './entities/employee.entity';
import { EmployeeContact } from '../employee-contacts/entities/employee-contact.entity';
import { EmployeeDependent } from '../employee-dependents/entities/employee-dependent.entity';
import { UserEntity } from '../auth/entities/user.entity';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [
    TypeOrmModule.forFeature([
      EmployeeEntity,
      EmployeeContact,
      EmployeeDependent,
      UserEntity,
    ]),

    AuthModule,
  ],
  exports: [EmployeeService, TypeOrmModule],
})
export class EmployeeModule {}
