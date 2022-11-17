import {
  IsBoolean,
  IsDate,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAssetDto {
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  subsidiary?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @IsString()
  serial_number: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsISO8601()
  purchase_date?: Date;

  @IsOptional()
  @IsISO8601()
  warranty_Date?: Date;

  @IsOptional()
  @IsNumber()
  purchase_price?: number;

  @IsOptional()
  @IsString()
  condition_equipment?: string;

  @IsOptional()
  @IsNumber()
  antiquity?: number;

  @IsOptional()
  @IsNumber()
  current_value?: number;

  @IsOptional()
  @IsString()
  status_warranty?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsISO8601()
  created_at?: Date;

  @IsOptional()
  @IsString()
  createUserId?: string;

  @IsOptional()
  @IsISO8601()
  updated_at?: Date;

  @IsOptional()
  @IsString()
  updateUserId?: string;

  @IsOptional()
  @IsISO8601()
  deleted_at?: Date;

  @IsOptional()
  @IsString()
  deleteUserId?: string;
}
