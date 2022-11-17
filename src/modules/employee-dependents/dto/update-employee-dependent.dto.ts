import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDependentDto } from './create-employee-dependent.dto';

export class UpdateEmployeeDependentDto extends PartialType(
  CreateEmployeeDependentDto,
) {}
