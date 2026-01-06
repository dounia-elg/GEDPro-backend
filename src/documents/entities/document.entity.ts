import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Candidate } from '../../candidates/entities/candidate.entity';
import { DocumentCategory } from '../enums/document-category.enum';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column({
    type: 'enum',
    enum: DocumentCategory,
  })
  category: DocumentCategory;

  @ManyToOne(() => Candidate, (candidate) => candidate.documents, {
    onDelete: 'CASCADE',
  })
  candidate: Candidate;

  @CreateDateColumn()
  createdAt: Date;
}
