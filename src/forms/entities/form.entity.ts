import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { FormField } from './form-field.entity';

@Entity()
export class Form {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => FormField, field => field.form, {
    cascade: true,
  })
  fields: FormField[];

  @CreateDateColumn()
  createdAt: Date;
}
