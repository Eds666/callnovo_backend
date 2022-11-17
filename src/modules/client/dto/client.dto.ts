import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class ClientDto {
  @IsNotBlank({ message: 'el nombre no puede estar vacío' })
  name?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

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
  @IsString()
  address: string;

  @IsOptional()
  picture: string;
}
