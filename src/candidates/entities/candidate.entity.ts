import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Skill } from '../../skills/entities/skill.entity';
import { Document } from '../../documents/entities/document.entity';
import { FormResponse } from '../../forms/entities/form-response.entity';
import { CandidateStatus } from '../enums/candidate-status.enum';

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: CandidateStatus,
    default: CandidateStatus.APPLIED,
  })
  status: CandidateStatus;

  @ManyToMany(() => Skill, (skill) => skill.candidates, { cascade: true })
  @JoinTable()
  skills: Skill[];

  @OneToMany(() => Document, (document) => document.candidate)
  documents: Document[];

  @OneToMany(() => FormResponse, (response) => response.candidate)
  formResponses: FormResponse[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}