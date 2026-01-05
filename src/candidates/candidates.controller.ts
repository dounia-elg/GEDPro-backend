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

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  
  @Post()
  create(
    @Body()
    body: {
      fullName: string;
      email: string;
    },
  ): Promise<Candidate> {
    return this.candidatesService.create(body);
  }

  
  @Get()
  findAll(): Promise<Candidate[]> {
    return this.candidatesService.findAll();
  }

  
  @Get('search')
  searchBySkill(@Query('skill') skill: string): Promise<Candidate[]> {
    return this.candidatesService.searchBySkill(skill);
  }

  
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Candidate> {
    return this.candidatesService.findOne(id);
  }

  
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: {
      fullName?: string;
      email?: string;
    },
  ): Promise<Candidate> {
    return this.candidatesService.update(id, body);
  }

  
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.candidatesService.remove(id);
  }
}
