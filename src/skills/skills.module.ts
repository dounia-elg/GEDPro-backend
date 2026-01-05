import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { SkillsService } from './skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
