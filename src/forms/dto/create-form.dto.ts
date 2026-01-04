import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFormFieldDto {
  @IsString()
  label: string;

  @IsString()
  type: string;

  @IsOptional()
  required?: boolean;

  @IsOptional()
  @IsArray()
  options?: string[]; 

  @IsOptional()
  order?: number;
}

export class CreateFormDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFormFieldDto)
  fields: CreateFormFieldDto[];
}