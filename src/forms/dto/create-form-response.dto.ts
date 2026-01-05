import { IsObject, IsString } from 'class-validator';

export class CreateFormResponseDto {
  @IsString()
  formId: string;

  @IsString()
  candidateId: string;

  @IsObject()
  answers: Record<string, any>;
}
