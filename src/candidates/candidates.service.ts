import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { Skill } from '../skills/entities/skill.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CandidateStatus } from './enums/candidate-status.enum';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
  ) { }

  async create(dto: CreateCandidateDto): Promise<Candidate> {
    const candidate = this.candidateRepository.create(dto);
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

  async findOneWithDocuments(id: string): Promise<Candidate> {
    const candidate = await this.candidateRepository.findOne({
      where: { id },
      relations: ['skills', 'documents'],
    });
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }

    return candidate;
  }

  async findOneWithResponses(id: string): Promise<Candidate> {
    const candidate = await this.candidateRepository.findOne({
      where: { id },
      relations: ['skills', 'formResponses', 'formResponses.form'],
    });
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }
    return candidate;
  }
  async findOneDetailed(id: string): Promise<Candidate> {
    const candidate = await this.candidateRepository.findOne({
      where: { id },
      relations: [
        'skills',
        'documents',
        'formResponses',
        'formResponses.form',
      ],
    });
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }

    return candidate;
  }

  async findByStatus(status: CandidateStatus): Promise<Candidate[]> {
    return this.candidateRepository.find({
      where: { status },
      relations: ['skills'],
    });
  }
  async update(id: string, dto: UpdateCandidateDto): Promise<Candidate> {
    const candidate = await this.findOne(id);
    Object.assign(candidate, dto);
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
