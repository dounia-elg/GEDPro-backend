import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Skill } from '../../skills/entities/skill.entity';

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
}
