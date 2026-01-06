import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CandidateStatus } from './enums/candidate-status.enum';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  create(@Body() dto: CreateCandidateDto): Promise<Candidate> {
    return this.candidatesService.create(dto);
  }

  @Get()
  findAll(): Promise<Candidate[]> {
    return this.candidatesService.findAll();
  }

  @Get('search')
  searchBySkill(@Query('skill') skill: string): Promise<Candidate[]> {
    return this.candidatesService.searchBySkill(skill);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: CandidateStatus): Promise<Candidate[]> {
    return this.candidatesService.findByStatus(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Candidate> {
    return this.candidatesService.findOne(id);
  }

  @Get(':id/documents')
  findOneWithDocuments(@Param('id') id: string): Promise<Candidate> {
    return this.candidatesService.findOneWithDocuments(id);
  }

  @Get(':id/responses')
  findOneWithResponses(@Param('id') id: string): Promise<Candidate> {
    return this.candidatesService.findOneWithResponses(id);
  }

  @Get(':id/detail')
  findOneDetailed(@Param('id') id: string): Promise<Candidate> {
    return this.candidatesService.findOneDetailed(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCandidateDto,
  ): Promise<Candidate> {
    return this.candidatesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.candidatesService.remove(id);
  }
}
