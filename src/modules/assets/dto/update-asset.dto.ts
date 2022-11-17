import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDate,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateAssetDto } from './create-asset.dto';

export class UpdateAssetDto extends PartialType(CreateAssetDto) {
  @IsString()
  //@IsUUID()
  @IsOptional()
  readonly Id?: number;

  @IsString()
  @IsUUID()
  @IsOptional()
  readonly userId?: string;

  @IsString()
  readonly location?: string;

  @IsString()
  readonly subsidiary?: string;

  @IsString()
  readonly category?: string;

  @IsString()
  readonly description?: string;

  @IsString()
  readonly brand?: string;

  @IsString()
  readonly model?: string;

  @IsString()
  readonly serial_number?: string;

  @IsString()
  readonly code?: string;

  @IsISO8601()
  readonly purchase_date?: Date;

  @IsISO8601()
  readonly warranty_Date?: Date;

  @IsNumber()
  readonly purchase_price?: number;

  @IsString()
  readonly condition_equipment?: string;

  @IsNumber()
  readonly antiquity?: number;

  @IsNumber()
  readonly current_value?: number;

  @IsString()
  readonly status_warranty?: string;

  @IsBoolean()
  readonly status?: boolean;

  @IsISO8601()
  readonly created_at?: Date;

  @IsString()
  @IsUUID()
  @IsOptional()
  readonly createUserId?: string;

  @IsDate()
  readonly updated_at?: Date;

  @IsString()
  @IsUUID()
  @IsOptional()
  readonly updateUserId?: string;

  @IsDate()
  readonly deleted_at?: Date;

  @IsString()
  @IsUUID()
  @IsOptional()
  readonly deleteUserId?: string;
}
