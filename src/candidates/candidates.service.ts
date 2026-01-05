import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { Skill } from '../skills/entities/skill.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
  ) {}

  
  async create(data: {
    fullName: string;
    email: string;
  }): Promise<Candidate> {
    const candidate = this.candidateRepository.create(data);
    return this.candidateRepository.save(candidate);
  }

  
  async findAll(): Promise<Candidate[]> {
    return this.candidateRepository.find({
      relations: ['skills'],
    });
  }

  
  async findOne(id: string): Promise<Candidate> {
    const candidate = await this.candidateRepository.findOne({
      where: { id },
      relations: ['skills'],
    });

    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }

    return candidate;
  }

  
  async update(
    id: string,
    data: Partial<{ fullName: string; email: string }>,
  ): Promise<Candidate> {
    const candidate = await this.findOne(id);

    Object.assign(candidate, data);

    return this.candidateRepository.save(candidate);
  }

  
  async remove(id: string): Promise<void> {
    const candidate = await this.findOne(id);
    await this.candidateRepository.remove(candidate);
  }

  
  async attachSkills(candidateId: string, skills: Skill[]): Promise<Candidate> {
    const candidate = await this.findOne(candidateId);

    candidate.skills = skills;

    return this.candidateRepository.save(candidate);
  }

  
  async searchBySkill(skillName: string): Promise<Candidate[]> {
    return this.candidateRepository
      .createQueryBuilder('candidate')
      .leftJoinAndSelect('candidate.skills', 'skill')
      .where('skill.name ILIKE :skill', { skill: `%${skillName}%` })
      .getMany();
  }
}
