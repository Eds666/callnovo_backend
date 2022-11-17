import { Module } from '@nestjs/common';
import { EmployeeDependentsService } from './employee-dependents.service';
import { EmployeeDependentsController } from './employee-dependents.controller';
import { EmployeeDependent } from './entities/employee-dependent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EmployeeDependentsController],
  providers: [EmployeeDependentsService],
  imports: [TypeOrmModule.forFeature([EmployeeDependent])],
})
export class EmployeeDependentsModule {}
