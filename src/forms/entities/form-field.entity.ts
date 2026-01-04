import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Form } from './form.entity';

export enum FieldType {
    TEXT = 'text',
    NUMBER = 'number',
    EMAIL = 'email',
    FILE = 'file',
    DATE = 'date',
    SELECT = 'select',
}

@Entity('form_fields')
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

    @Column({ type: 'json', nullable: true })
    options: string[];

    @Column({ default: 0 })
    order: number;

    @ManyToOne(() => Form, (form) => form.fields, { onDelete: 'CASCADE' })
    form: Form;
}