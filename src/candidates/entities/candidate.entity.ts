import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Skill } from '../../skills/entities/skill.entity';
import { FormResponse } from '../../forms/entities/form-response.entity';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @ManyToMany(() => Skill, skill => skill.candidates, { cascade: true })
  @JoinTable()
  skills: Skill[];

  @OneToMany(() => FormResponse, formResponse => formResponse.candidate)
  formResponses: FormResponse[];
}
