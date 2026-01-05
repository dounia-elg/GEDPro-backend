import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { SKILLS_DICTIONARY } from './skills.dictionary';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async extractSkills(text: string): Promise<Skill[]> {
    const foundSkills: Skill[] = [];
    const lowerText = text.toLowerCase();

    for (const skillName of SKILLS_DICTIONARY) {
      if (lowerText.includes(skillName)) {
        let skill = await this.skillRepository.findOne({
          where: { name: skillName },
        });

        if (!skill) {
          skill = this.skillRepository.create({ name: skillName });
          skill = await this.skillRepository.save(skill);
        }

        foundSkills.push(skill);
      }
    }

    return foundSkills;
  }

  async searchSkills(keyword: string): Promise<Skill[]> {
    return this.skillRepository.find({
      where: { name: ILike(`%${keyword}%`) },
    });
  }
}
