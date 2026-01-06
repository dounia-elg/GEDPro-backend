import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { Candidate } from './entities/candidate.entity';
import { Skill } from '../skills/entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, Skill])],
  controllers: [CandidatesController],
  providers: [CandidatesService],
  exports: [CandidatesService],
})
export class CandidatesModule {}