import {
  IsBoolean,
  IsEmpty,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';
import { IsNull } from 'typeorm';

export class CampaingDto {
  @IsNotBlank({ message: 'el nombre no puede estar vacío' })
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsNumber()
  phone_first?: number;

  @IsOptional()
  @IsNumber()
  phone_second?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsISO8601()
  start_date?: Date;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsNumber()
  rate?: number;

  @IsOptional()
  @IsNumber()
  operation_hours?: number;

  @IsOptional()
  @IsNumber()
  type_position?: number;

  @IsOptional()
  @IsISO8601()
  end_date?: Date;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsISO8601()
  created_at?: Date;

  @IsOptional()
  @IsNumber()
  CreateUserId?: number;

  @IsOptional()
  @IsISO8601()
  updated_at?: Date;

  @IsOptional()
  @IsNumber()
  UpdateUserId?: number;

  @IsOptional()
  @IsISO8601()
  deleted_at?: Date;

  @IsOptional()
  @IsNumber()
  DeleteUserId?: number;
  
  @IsOptional()
  @IsNumber()
  client_id?: number;

  @IsOptional()
  @IsNumber()
  employee_id?: number;

}
