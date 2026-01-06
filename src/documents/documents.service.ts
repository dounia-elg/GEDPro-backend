import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { Candidate } from '../candidates/entities/candidate.entity';
import { DocumentCategory } from './enums/document-category.enum';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,

    @InjectRepository(Candidate)
    private candidatesRepository: Repository<Candidate>,
  ) {}

  async uploadDocument(
    candidateId: number,
    filename: string,
    path: string,
    category: DocumentCategory,
  ): Promise<Document> {
    const candidate = await this.candidatesRepository.findOne({
      where: { id: candidateId },
    });

    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }

    const document = this.documentsRepository.create({
      filename,
      path,
      category,
      candidate,
    });

    return this.documentsRepository.save(document);
  }

  async findAll(): Promise<Document[]> {
    return this.documentsRepository.find({
      relations: ['candidate'],
    });
  }

  async findByCandidate(candidateId: number): Promise<Document[]> {
    return this.documentsRepository.find({
      where: { candidate: { id: candidateId } },
      relations: ['candidate'],
    });
  }

  async findByCategory(category: DocumentCategory): Promise<Document[]> {
    return this.documentsRepository.find({
      where: { category },
      relations: ['candidate'],
    });
  }

  async findByCandidateAndCategory(
    candidateId: number,
    category: DocumentCategory,
  ): Promise<Document[]> {
    return this.documentsRepository.find({
      where: {
        candidate: { id: candidateId },
        category,
      },
      relations: ['candidate'],
    });
  }
}
