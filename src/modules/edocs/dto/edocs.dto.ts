import { IsBoolean, IsISO8601, IsString } from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class EdocsDto {
  @IsNotBlank({ message: 'el nombre no puede estar vacío' })
  name?: string;

  @IsString()
  content: string;

  @IsBoolean()
  is_active: boolean;

  @IsISO8601()
  created_at: Date;

  createUserId: number;

  @IsISO8601()
  updated_at: Date;

  updateUserId: number;

  @IsISO8601()
  deleted_at: Date;

  deleteUserId: number;
}
