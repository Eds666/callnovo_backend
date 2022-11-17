import {
  IsArray,
  IsEmail,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateEmployeeDto {
  @IsNotBlank({ message: 'el nombre no puede estar vacío -->' })
  name?: string;

  @IsNotBlank({ message: 'tu apellido no puede estar vacion ' })
  surname?: string;

  @IsOptional()
  /* @IsNotEmpty()
  @IsNotBlank({ message: 'debes llenar el numero de documento' }) */
  number_document: string;

  @IsOptional()
  @IsISO8601()
  birthdate: Date;

  @IsOptional()
  @IsNumber()
  phone_number: number;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEmail()
  work_email: string;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  profession: string;

  @IsOptional()
  enabled: boolean;

  @IsOptional()
  @IsString()
  picture: string;

  @IsOptional()
  state: boolean;

  @IsOptional()
  @IsNumber()
  position_id: number;

  @IsOptional()
  @IsNumber()
  organization_chart_id: number;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  contacts?: string[];
}
