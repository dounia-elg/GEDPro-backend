import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { FieldType } from '../entities/form-field.entity';

export class CreateFormFieldDto {
  @IsString()
  label: string;

  @IsEnum(FieldType)
  type: FieldType;

  @IsBoolean()
  required: boolean;
}
