import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EmployeeContactsService } from './employee-contacts.service';
import { EmployeeContactsController } from './employee-contacts.controller';
import { EmployeeContact } from './entities/employee-contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeContact])],
  controllers: [EmployeeContactsController],
  providers: [EmployeeContactsService],
})
export class EmployeeContactsModule {}
