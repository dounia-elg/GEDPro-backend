import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Form } from './form.entity';

export enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  FILE = 'file',
  DATE = 'date',
  SELECT = 'select',
}

@Entity()
export class FormField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column({
    type: 'enum',
    enum: FieldType,
  })
  type: FieldType;

  @Column({ default: false })
  required: boolean;

  @ManyToOne(() => Form, form => form.fields, {
    onDelete: 'CASCADE',
  })
  form: Form;
}
