import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeContactDto } from './create-employee-contact.dto';

export class UpdateEmployeeContactDto extends PartialType(
  CreateEmployeeContactDto,
) {}
