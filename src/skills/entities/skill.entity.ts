import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Candidate } from '../../candidates/entities/candidate.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Candidate, candidate => candidate.skills)
  candidates: Candidate[];
}
