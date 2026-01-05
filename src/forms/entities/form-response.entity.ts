import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Form } from './form.entity';

@Entity()
export class FormResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Form, {
    onDelete: 'CASCADE',
  })
  form: Form;

  @Column({ type: 'json' })
  answers: Record<string, any>;

  @Column()
  candidateId: string;

  @CreateDateColumn()
  submittedAt: Date;
}
