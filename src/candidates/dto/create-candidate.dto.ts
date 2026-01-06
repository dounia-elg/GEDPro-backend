import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { CandidateStatus } from '../enums/candidate-status.enum';

export class CreateCandidateDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(CandidateStatus)
  status?: CandidateStatus;
}