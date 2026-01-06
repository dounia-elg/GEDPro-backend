import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Form } from './form.entity';
import { Candidate } from '../../candidates/entities/candidate.entity';

@Entity('form_responses')
export class FormResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Form, {
    onDelete: 'CASCADE',
  })
  form: Form;

  @ManyToOne(() => Candidate, (candidate) => candidate.formResponses, {
    onDelete: 'CASCADE',
  })
  candidate: Candidate;

  @Column({ type: 'json' })
  answers: Record<string, any>;

  
  @CreateDateColumn()
  submittedAt: Date;
}
