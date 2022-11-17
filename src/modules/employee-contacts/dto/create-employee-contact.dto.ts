import {
  IsInt,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateEmployeeContactDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  surname?: string;

  @IsNumber()
  // @IsPositive()
  @IsOptional()
  first_number?: number;

  @IsNumber()
  // @IsPositive()
  @IsOptional()
  second_number?: number;

  @IsString()
  @MinLength(2)
  @IsOptional()
  relationship?: string;

  @IsISO8601()
  @IsOptional()
  birthdate?: Date;

  @IsISO8601()
  @IsOptional()
  created_at?: Date;

  @IsInt()
  @IsOptional()
  CreateUserId?: number;

  @IsISO8601()
  @IsOptional()
  updated_at?: Date;

  @IsInt()
  @IsOptional()
  UpdateUserId?: number;

  @IsISO8601()
  @IsOptional()
  deleted_at?: Date;

  @IsInt()
  @IsOptional()
  DeleteUserId?: number;
}
